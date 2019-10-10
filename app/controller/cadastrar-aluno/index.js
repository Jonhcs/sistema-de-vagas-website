const Cadastrar = require('./../../models/cadastrar-aluno')
const bcrypt = require('bcryptjs')
const passport = require('passport')


module.exports = {
    new(req, res) {
        res.render('cadastrar-aluno/new', {
            title:'Freelancer with Danilo',
            //layout: 'layouts/base',
        })
    },
    create(req, res) {
            let error = []

            if (!req.body.name || typeof req.body.name == undefined || req.body.name == null ) {
                error.push({texto: 'Nome Inválido'})
            }
            if (!req.body.email || typeof req.body.email == undefined || req.body.email == null ) {
                error.push({texto: 'Email Inválido'})
            }
            if (!req.body.password || typeof req.body.password == undefined || req.body.password == null ) {
                error.push({texto: 'password Inválido'})
            }
            if (req.body.password.length < 4) {
                error.push({texto: 'Senha Muito Curta'})
            }
            if (error.length > 0) {
                res.sendo({
                    texto
                })
            }else{
                Cadastrar.findOne({email: req.body.email}).then((usuario) => {
                    if (usuario) {
                        res.send('Email já existe no banco de dados')
                        res.redirect('/cadastrar-aluno/login')

                    }else{

                        const novoUsuario = new Cadastrar({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        })

                        bcrypt.genSalt(10, (erro, salt) => {
                            bcrypt.hash(novoUsuario.password, salt, (erro, hash) => {
                                if (erro) {
                                    res.send(' OCORREU UM ERRO NO SALVAMENTO ')
                                    res.redirect('/')
                                }

                                novoUsuario.password = hash
                                novoUsuario.save().then(() => {
                                    res.send('Registrado com Sucesso')
                                    res.redirect('/')

                                }).catch((error) => {
                                    
                                    res.send('Ocrreu um erro no salvamento' + error)
                                    res.redirect('/cadastrar-aluno/new')
                                })
                            })
                        })

                    }
                }).catch( (error) => {
                    console.log('algo errado' + error)
                    res.redirect('/')
                })   
            }

    },
    show(req, res ) {
        CadastrarA
                .findById(req.params.id)
                .then( (aluno) => {
                    return res.render('cadastrar-aluno/minha-conta', {
                        title:'Freelancer with Danilo',
                        //layout: 'layouts/base',
                        title: "Dados de contato com o Dev",
                        aluno: aluno
                    })
                })
                .catch( (error) => {
                    console.log('algo errado' + error)
                })       
    },
    login(req, res) {
        passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/cadastrar-aluno-login'
        })
    },
    loginForm(req, res) {
        res.render('cadastrar-aluno/login',{
            
        })
    }
    
}
    
