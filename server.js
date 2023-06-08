const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const {Sequelize}= require("sequelize");


app.use(express.json())

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Dialog API',
            description: 'Dialog API Information',
            contact: {
                name: 'Developer Name',
            },
            servers: ['http://localhost:3000'],
        },
    },
    apis: ['./routes/v1/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1', require('./routes/v1'))

/*app.get('/', middleware, (req, res) => {
    res.send('Hello')
})*/

app.get('*', (req, res) => {
    //res.status(404).json({ message: 'Not found'}) bonne pratique
    res.sendFile(__dirname + "/view/404.html")
})

app.get('/allchats', (req, res) => {
    res.status(200).json({
        data:[{question: "Comment ca va ?", answer: "Bien et toi ?"},
        {question: "Quel est ton âge ?", answer: "Je suis une IA donc je n'ai pas d'âge"},
        {question: "Quel temps fait-il à Boulogne ?", answer: "Il fait 22°C"}]
    })
})

app.get('/createchat', (req, res) => {
    res.status(200).json({
        message:"created"
    })
})

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});

(async function connect(){
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

/*var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7623774",
  password: "4f3lyce9bS"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/



/*function middleware(req, res, next){
    console.log('coucou')
    next()
}*/