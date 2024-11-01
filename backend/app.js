require('dotenv').config();

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT;
const app = express();

//confi json and form data response
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//solve CORS
app.use(cors({credentials:true,origin:"http://localhost:3000"}))

//updload directory
//app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


//DB Connection
require('./config/db.js')

//routes
const router = require('./routes/Route.js');
app.use(router);

app.listen(port, () =>{
    console.log(`App rodando na porta  ${port}`)
})