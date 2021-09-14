require('dotenv').config()

const config = {
   mongoUri: process.env.MONGOURI,
   dbName: process.env.MONGODB,
   port: process.env.PORT
}

module.exports = config