const mongoose = require('mongoose')

const Aluno = new mongoose.Schema ({
    name: {
        type: String,
    },
    telefone: {
        type: String,
    },
    valor_hora: {
        type: String,
    }
})


module.exports = mongoose.model('Aluno', Aluno)