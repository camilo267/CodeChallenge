const mongoose = require('mongoose');
const Schema = mongoose.Schema

const contractorSchema = new Schema({
   image: String,
   firstName: String,
   lastName: String,
   email: String,
   phoneNumber: Number,
})

module.exports = mongoose.model('Contractor', contractorSchema)