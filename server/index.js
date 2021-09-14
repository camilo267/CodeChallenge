const express = require('express');
const cors = require('cors')
const config = require('./config/index')
const db = require('./db')
const port = config.port;

const routes = require("./routes")

const app = express();
db(config.mongoUri)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
   extended: true
}))
app.use("/", routes)
app.use('/public', express.static(`${__dirname}/storage/imgs`))

app.listen(port ,()=> {
   console.log(`listening on port ${port}`);
});