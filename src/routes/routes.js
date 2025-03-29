const express = require('express');
const multer = require('multer');
const { createUser,verifyUserOtp, userLogIn } = require('../controller/userController.js');
const {useAuth, useLogAuth} = require('../middleware/validUserData.js')
const route = express.Router();

const upload = multer({storage:multer.diskStorage({})})

route.post('/api/users',upload.single('profileImg'),useAuth, createUser)
route.post('/verifyUserOtp/:id', verifyUserOtp)
route.post('/api/login',useLogAuth, userLogIn)

route.all('/*', (req, res)=>{
    res.status(400).send({ status: false, msg: 'Wrong URL' })
})

module.exports = route;

