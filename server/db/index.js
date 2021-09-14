const db = require('mongoose')
const config = require('../config/index')
db.Promise = global.Promise

const connect = async (url) => {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: config.dbName
    })
    console.log('[db] connected sucessfully')
}

module.exports = connect