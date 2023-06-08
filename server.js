const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { Sequelize } = require('sequelize');
const dialogData = require('./dialogs.json');
const cors = require('cors');

app.use(cors());

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

app.use('/api/v1', cors(), require('./routes/v1'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', '404.html'));
});

app.get('/allchats', cors(), (req, res) => {
  res.status(200).json(dialogData);
});

app.get('/createchat', cors(), (req, res) => {
  res.status(200).json({
    message: 'created',
  });
});

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite',
});

(async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
