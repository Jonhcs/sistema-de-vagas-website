module.exports = (app, passport) => {
    app.use('/', require('./routes/home'))
    app.use('/cadastro', require('./routes/cadastro'))
    app.use('/cadastrar-aluno', require('./routes/cadastrar-aluno')(passport))
    
}