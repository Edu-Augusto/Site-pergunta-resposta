const Sequelize=require("sequelize");
const connection=require("./databse");

const Pergunta=connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descrição:{
        type: Sequelize.TEXT,
        allowNull:false
    }
})

Pergunta.sync({force:false}).then(()=>{});

module.exports=Pergunta;
