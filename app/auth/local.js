const LocalStrategy = require('passport-local').Strategy
const Cadastrar = require('./../models/cadastrar-aluno')
const bcrypt = require('bcryptjs')


module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            Cadastrar
                .findOne({email: email})
                .then((usuario) => {
                    if (!usuario) {
                        console.log("Essa conta não existe")
                        return done(null, false)
                    }

                    bcrypt.compare(password, usuario.password, (erro, batem) => {
                    
                        if (batem) {
                            console.log('senha bateu')
                            return done(null, usuario)
                        }else {
                            console.log( "Senha está errada")
                            return done(null, false)
                        }
                })
            })

    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario._id)
    })
    passport.deserializeUser((id, done) => {
        Cadastrar.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}