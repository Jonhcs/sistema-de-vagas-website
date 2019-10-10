const mongoose = require('mongoose')

const Cadastrar = new mongoose.Schema ({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
    }
})

module.exports = mongoose.model('Cadastrar', Cadastrar)