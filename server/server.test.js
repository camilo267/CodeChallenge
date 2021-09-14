const mongoose = require("mongoose")
const createServer = require("./server")
require('dotenv').config()
const Contractor = require('./models/contractor') 
const supertest = require('supertest');
var axios = require('axios');

beforeEach((done) => {
   mongoose.connect(
		"mongodb+srv://camilo:1234@cluster0.c2dln.mongodb.net",
		{ useNewUrlParser: true },
		() => done()
	)
})

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

const app = createServer()


describe('GET Endpoints', () => {
   it('should get all the contractors', async () => {
   	await supertest(app)
		.get("/contractors")
		.expect(200)
		.then((response) => {
			// Check the response type
			expect(Array.isArray(response.body)).toBeTruthy()
         expect(response.statusCode).toEqual(200)
		})
   })
 })


describe('GET Endpoints', () => {
   it('should get an specific contractor by id', async () => {
	const contractor = await Contractor.create({
      image: 'image-test.jpg',
      firstName: 'jhon',
      lastName: 'smith',
      email: 'jhonsmith@hotmail.es',
      phoneNumber: "123456"
	})
	await supertest(app)
		.get("/contractors/" + contractor.id)
		.expect(200)
		.then((response) => {
         expect(response.statusCode).toEqual(200)
			expect(response.body._id).toBe(contractor.id)
			expect(response.body.firstName).toBe(contractor.firstName)
			expect(response.body.lastName).toBe(contractor.lastName)
			expect(response.body.image).toBe(contractor.image)
			expect(response.body.email).toBe(contractor.email)
			expect(response.body.phoneNumber).toBe(contractor.phoneNumber)
		})
   })
})


// Get request by giving a wrong id
describe('GET Endpoints', () => {
   it('should get an error by giving a wrong id', async () => {
	const contractorId = '12345'
	await supertest(app)
		.get(`/contractors/${contractorId}`)
		.then((response) => {
         expect(response.statusCode).toEqual(500)
		})
   })
})


describe('POST Endpoints', () => {
   it('should handle POST error without any body', async () => {
      await supertest(app)
      .post('/contractor/add')
      .expect(404)
      .then(async (response) => {
         expect(response.text.includes('Not Found'));
      });
   })
})

describe('DELETE Endpoint', () => {
   it('should delete a contractor', async () => {
      const contractor = await Contractor.create({
         image: 'image-test.jpg',
         firstName: 'jhon',
         lastName: 'smith',
         email: 'jhonsmith@hotmail.es',
         phoneNumber: "123456"
      })
	await supertest(app)
		.delete("/contractors/delete/" + contractor.id)
		.expect(204)
		.then(async () => {
			expect(await Contractor.findOne({ _id: contractor.id })).toBeFalsy()
		})
   })
})
	