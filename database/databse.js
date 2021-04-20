const Sequelize=require('sequelize');
const connection=new Sequelize('perguntaresposta', 'root', 'edu131413',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=connection;
