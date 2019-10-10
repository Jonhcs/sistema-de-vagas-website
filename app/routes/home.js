const express = require('express')
const router = express.Router()
const homeMain = require('./../controller/homeSite/index')
//const verifica = require('./../auth/middleware')

    router.get('/', homeMain );

    module.exports = router