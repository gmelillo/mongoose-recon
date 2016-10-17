# mongoose-recon
Add reconnection handler on mongoose

[![NPM version](https://badge.fury.io/js/mongoose-recon.svg)](https://www.npmjs.com/package/mongoose-recon/)

### Getting started

```bash
npm install mongoose-recon 
```

### Usage

```node
var mongoose = require('mongoose');

mongooseConnection = (mongoose, error) => {
	mongoose.connect(process.env.MONGODB || 'mongodb://localhost/database', error);
	mongoose.Promise = global.Promise;
	return mongoose;
}

require('mongoose-recon')(mongoose, mongooseConnection, 6000);
```
