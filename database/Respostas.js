const Sequelize=require("sequelize");
const connection=require("./databse");

const Resposta=connection.define(" respostas " ,{
    corpo:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    idPergunta:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
});
Resposta.sync({force:false});

module.exports= Resposta;