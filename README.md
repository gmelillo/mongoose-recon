# mongoose-recon
Add reconnection handler on mongoose

# Usage

```node
var mongoose = require('mongoose');

mongooseConnection = (mongoose, error) => {
	mongoose.connect(process.env.MASTERMIND_MONGODB || 'mongodb://localhost/database', error);
	mongoose.Promise = global.Promise;
	return mongoose;
}

require('mongoose-recon')(mongoose, mongooseConnection, 6000);
```
