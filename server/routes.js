const express = require("express")
const Contractor = require("./models/contractor") // new
const router = express.Router()
const upload = require('./libs/storage')


//Get all contractors
router.get('/contractors', async (req, res)=>{
   try {
      const contractors = await Contractor.find()
      res.status(200).send(contractors)
   } catch (error) {
		res.status(500).send({ error: "Contractors not found" })
   }
})

//Get contractor details by id
router.get("/contractors/:id", async (req, res) => {
   try {
      const contractor = await Contractor.findOne({ _id: req.params.id })
      res.status(200).send(contractor)
   } catch (error) {
		res.status(500).send({ error: "Internal server error" })
   }
})

//Create new contractor
router.post("/contractors/add", upload.single('image'), async (req, res) => {
   try {
      const contractor = Contractor({
         image: req.body.image,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         phoneNumber: req.body.phoneNumber,
      })
      // const { filename } = req.file
      // contractor.setImgUrl(filename)
      const stored = await contractor.save()
      res.status(201).send({stored})
   } catch (error) {
		res.status(500).send({ error: "It was not possible to add the contractor" })
   }
})

//Update a contractor by id
router.put("/contractors/edit/:id", async (req, res) => {
	try {
		await Contractor.findOneAndUpdate({ _id: req.params.id }, req.body)
      const currentContractor = await Contractor.findOne({ _id: req.params.id })
		res.status(201).send(currentContractor)
	} catch {
		res.status(500).send({ error: "Internal server error" })
	}
})

//Delete a contractor by id
router.delete("/contractors/delete/:id", async (req, res) => {
	try {
		const { firstName, email } = await Contractor.findOneAndRemove({ _id: req.params.id })
		res.status(204).send({firstName, email})
	} catch {
		res.status(500).send({ error: "Contractor doesn't exist!" })
	}
})


module.exports = router