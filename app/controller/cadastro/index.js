const Aluno = require('./../../models/aluno')

module.exports = {
    index(req, res) {
        res.render('cadastro/index', {
            title:'Cadastro de Serviço',
            //layout: 'layouts/base'
        })
    },
    new(req, res) {
        return res.render('cadastro/aluno', {
            title:'Freelancer with Danilo',
            //layout: 'layouts/base',
            aluno: new Aluno()
        })
    },
    create(req, res) {
        Aluno
            .create(req.body)
            .then((alunoCadastrado) => {
                console.log(alunoCadastrado)
                return res.redirect('/')
            })
            .catch((erro) => {
                console.log(erro)
                return
            })
    }
}