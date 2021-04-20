const express = require("express");
const app = express();
//npm install body-parser --save ->para instalar a ferramenta para pegar os dados do formulario
const bodyParser = require("body-parser");
const connection = require('./database/databse');
const Pergunta = require('./database/Perguntas');
const Resposta=require("./database/Respostas")
//Database
connection
    .authenticate()
    .then(() => {
        console.log("Servidor conectado com sucesso com o banco de dados!")
    })
    .catch((erro) => {
        console.log(erro)
    })
// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] //Ordenando as perguntas com ASC=Crescente || DESC=Decrescente
        ]
    }).then(perguntas => {
        console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    });

});
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descrição: descricao
    }).then(() => {
        res.redirect('/');
    });
});
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined){

            Resposta.findAll({
                where: {idPergunta: pergunta.id},
                order:[
                    ['id','DESC']]
            }).then(respostas=>{
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas:respostas
                });
            });
        }
        else {
            res.redirect('/');
        }
    });
});
app.post("/responder",(req,res)=>{
    var corpo=req.body.corpo;
    var id=req.body.id;
    Resposta.create({
        corpo: corpo,
        idPergunta: id
    }).then(() => {
        res.redirect('/pergunta/'+ id);
    });

});
app.listen(8080, () => { console.log("App rodando!"); });
