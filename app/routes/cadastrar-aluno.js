const express = require('express')
const router = express.Router()
const cadastro = require('../controller/cadastrar-aluno/index')


module.exports = (passport) => {
    router.get('/new', cadastro.new)
    router.post('/', cadastro.create)
    router.get('/login', cadastro.loginForm)
    router.post('/login/auth', cadastro.login)
    router.get('/:id', cadastro.show)

    return router
}
