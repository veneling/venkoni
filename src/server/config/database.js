let mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.db, { useCreateIndex: true, useNewUrlParser: true })

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      throw err
    }

    console.log('Connected to the database')
  })
  db.on('error', err => console.log(err))
}
