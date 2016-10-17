var debug = require('debug')('mongoose-recon-debug')

var mongoConnected = false

module.exports = (mongoose, reconnect, retry) => {
  if (typeof retry === 'undefined') {
    debug('Retry time not configured, default : 5s')
    retry = 5000
  }
  if (typeof reconnect !== 'function') {
    throw new Error('reconnect paramiter must be function(mongoose,error).')
  }
  mongoose.connection.on('open', (ref) => {
    debug('Connection to MongoDB opened.')
    mongoConnected = true
  })
  mongoose.connection.on('connected', (ref) => {
    debug('Established connection on MongoDB.')
    mongoConnected = true
  })
  mongoose.connection.on('disconnected', (ref) => {
    debug('Disconnection detected, will try to reconnect soon...')
    mongoConnected = false
  })
  mongoose.connection.on('disconnected', (ref) => {
    debug('Error detected on MongoDB connection, will try to reconnect soon...')
    mongoConnected = false
  })

  const MongoDBReconnect = () => {
    if (!mongoConnected) {
      try {
        reconnect(mongoose, (error) => {
          if (error) {
            debug('Failed to connect to mongo on startup, will try to reconnect soon...')
          }
        })
      } catch (e) {
        debug('Retry failed with error :' + e)
      }
    }
  }
  MongoDBReconnect()
  setInterval(MongoDBReconnect, retry)

  return mongoose
}
