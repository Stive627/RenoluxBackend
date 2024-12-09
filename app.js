const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {routerAdmin, routerMedia, routerComment, routerPlaco, routerPeinture} = require('./Routes/RenoRoutes')
const GoogleAuth = require('./Auth0/GoogleAuth')

const app = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', GoogleAuth)
app.use('/admin', routerAdmin)
app.use('/media', routerMedia)
app.use('/comment', routerComment)
app.use('/placo', routerPlaco)
app.use('/peinture', routerPeinture)
app.use('/', express.static("public"))
mongoose.connect(process.env.URI, {'dbName':'RenoluxDB'}).then(()=>console.log('Connected to the database')).catch((error) =>console.log('An error occured', error)) 
app.listen(port, ()=>{console.log(`The server is running at http://localhost:${port}`)})