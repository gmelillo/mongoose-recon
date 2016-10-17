var debug    = require('debug')('mongoose-recon-debug')

var mongoConnected = false;

module.exports = function(mongoose, reconnect, retry) {
	if (typeof retry == 'undefined') {
		retry = 5000
	}
	if (typeof reconnect == 'undefined') {
		throw new Error('Please provide a connection string to handle the reconnection.');
	}
	if (typeof reconnect != 'function') {
		throw new Error('reconnect paramiter must be a function.');
	}
	mongoose.connection.on('open', (ref) => {
		debug('Connection to MongoDB opened.');
		mongoConnected = true;
	});
	mongoose.connection.on('connected', (ref) => {
		debug('Established connection on MongoDB.');
		mongoConnected = true;
	});
	mongoose.connection.on('disconnected', (ref) => {
		debug('Disconnection detected, will try to reconnect soon...');
		mongoConnected = false;
	});
	mongoose.connection.on('disconnected', (ref) => {
		debug('Error detected on MongoDB connection, will try to reconnect soon...');
		mongoConnected = false;
	});

	MongoDBReconnect = () => {
		if (!mongoConnected) {
			try{
				reconnect(mongoose, (error) => {
					if (error) {
						debug('Failed to connect to mongo on startup, will try to reconnect soon...')
					}
				});
			}catch(e) {
				debug('Retry failed with error :' + e);
			}
		}
	}
	MongoDBReconnect();
	setInterval(MongoDBReconnect, retry);

	return mongoose;
}
