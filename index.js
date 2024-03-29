//module imports 
const  express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')

// port import
const PORT = process.env.PORT

// instance of express
const app = express()

// bodyparser middleware for incoming data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware
app.use(cors())

// index route 
app.get('/', async (req, res) => {
    try {
        return res.status(StatusCodes.ACCEPTED).json({ status : true, msg: `welcome to fileupload Api`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status : false, msg: err})
    }
})

// api route
app.use(`/api/file`, require('./route/fileRoute'))

// default route
app.all(`**`, async (req, res) => {
    try {
        return res.status(StatusCodes.OK).json({ status : false, msg: `requested path not found` })
    } catch (error) {
        
    }
})

// server listener
app.listen(PORT,()=> {
    console.log(`server is running @ http://localhost:${PORT}`)
})
