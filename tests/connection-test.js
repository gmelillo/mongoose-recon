var chai = require('chai')
var expect = chai.expect
var MongooseRecon = require('../index.js')
var mongoose = require('mongoose')

describe('# Step 1 : Params', () => {
  it ('() should return an exception if no connection function is passed.', () => {
    expect(MongooseRecon.bind(MongooseRecon, mongoose)).to.throw('reconnect paramiter must be function(mongoose,error).')
  })
  it ('() Should return a valid mongoose object.', () => {
    expect(MongooseRecon(mongoose, (mongoose, error) => {
      mongoose.connect('mongodb://localhost/dbtest')
    })).to.equal(mongoose)
  })
})

MongooseRecon(mongoose, (mongoose, error) => {
  mongoose.connect('mongodb://localhost/test', error);
  mongoose.Promise = global.Promise;
  return mongoose;
})

describe('# Step 2 : DB operations', () => {
  it('Should be able to get database details.', (done) => {
    mongoose.connection.db.stats((err, stats) => {
      if (err) {
        done(err)
      }
      expect(stats.ok).to.equal(1)
      done()
    });
  });
});
