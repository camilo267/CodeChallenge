const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { appConfig } = require('../config/index')

const ContractorSchema = new Schema({
   image: String,
   firstName: String,
   lastName: String,
   email: String,
   phoneNumber: Number,
})

ContractorSchema.methods.setImgUrl = function setImgUrl(filename) {
   const { port, host } = appConfig
   this.image = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model('Contractor', ContractorSchema)