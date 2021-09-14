const express = require("express")
const routes = require("./routes")


function createServer() {
	const app = express()
	app.use("/", routes)
	app.use(express.json())
	return app
}

module.exports = createServer