const express = require('express')
const { Register, login, addMedia, updateMedia, deleteMedia, passwordRecovery, passwordChange, addComment, displayComment, showMedia, deleteComment, placoDevis, peintureDevis } = require('../Controller/renoController')
const multer = require('multer')
const routerAdmin = express.Router()
const routerMedia = express.Router()
const routerComment = express.Router()
const routerPlaco = express.Router()
const routerPeinture = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/medias/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    } 
})

const authRoute = (req, res, next) =>{
    const token = req.headers['authorization']
    if(!token) return res.status(401).send("you have to provide a token.")
    const payload = process.env.SECRET_KEY
    jwt.verify(token,payload, (err, user)=>{
    if(err){
        res.status(403).send(err)
        return;
    }
    req.user = user
    next()
    })
}

const upload = multer({storage:storage})
 
routerAdmin.post('/register', Register)
routerAdmin.post('/login', login)
routerAdmin.post('/passwordRecovery',passwordRecovery)
routerAdmin.post('/passwordChange', passwordChange)

routerMedia.post('/add',authRoute, upload.single('media') ,addMedia)
routerMedia.put('/update/:id',authRoute, upload.single('media'), updateMedia)
routerMedia.delete('/delete/:id', authRoute,  deleteMedia)
routerMedia.get('/show',  showMedia)

routerComment.post('/add', addComment)
routerComment.delete('/delete/:id', authRoute, deleteComment )
routerComment.get('/show', displayComment)

routerPlaco.post('/generate', authRoute, placoDevis)
routerPeinture.post('/generate', authRoute, peintureDevis)

module.exports = {routerAdmin, routerMedia, routerComment, routerPlaco, routerPeinture}