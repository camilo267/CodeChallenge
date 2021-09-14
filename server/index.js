const express = require('express');
const Contractor = require('./models/contractor') 
const cors = require('cors')
const config = require('./config/index')
const db = require('./db')

db(config.mongoUri)

const app = express();

const port = config.port;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
   extended: true
}))

//Get all contractors
app.get('/contractors', async (req, res)=>{
   try {
      const contractors = await Contractor.find()
      res.status(200).send(contractors)
   } catch (error) {
		res.status(500).send({ error: "Contractors not found" })
   }
})

//Get contractor details by id
app.get("/contractors/:id", async (req, res) => {
   try {
      const contractor = await Contractor.findOne({ _id: req.params.id })
      res.status(200).send(contractor)
   } catch (error) {
		res.status(500).send({ error: "Internal server error" })
   }
})

//Create new contractor
app.post("/contractors/add", async (req, res) => {
   try {
      const contractor = new Contractor({
         image: req.body.image,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         phoneNumber: req.body.phoneNumber,
      })
      await contractor.save()
      res.status(201).send(contractor)
   } catch (error) {
		res.status(500).send({ error: "It was not possible to add the contractor" })
   }
})

//Update a contractor by id
app.put("/contractors/edit/:id", async (req, res) => {
	try {
		await Contractor.findOneAndUpdate({ _id: req.params.id }, req.body)
      const currentContractor = await Contractor.findOne({ _id: req.params.id })
		res.status(201).send(currentContractor)
	} catch {
		res.status(500).send({ error: "Internal server error" })
	}
})

//Delete a contractor by id
app.delete("/contractors/delete/:id", async (req, res) => {
	try {
		const { firstName, email } = await Contractor.findOneAndRemove({ _id: req.params.id })
		res.status(200).send({firstName, email})
	} catch {
		res.status(500).send({ error: "Contractor doesn't exist!" })
	}
})

app.listen(port ,()=> {
   console.log(`listening on port ${port}`);
});

