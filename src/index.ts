import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import issueController from './controllers/issue.controller'
import errorHandler from './middleware/error.middleware'

const app = express()
const port = process.env.PORT

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(function (_, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept',
//     )
//     next()
// })

// MongoDB connection
mongoose
    .connect(process.env.DB_CONNECTION_STRING ?? '')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/issues', issueController)

// Error handling
app.use(errorHandler)

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
