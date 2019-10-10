const Aluno = require('./../../models/aluno')

module.exports = (req, res) => {
        res.render('home/index',{ 
                title:'Freelancer with Danilo',
                //layout: 'layouts/base'
        });
}