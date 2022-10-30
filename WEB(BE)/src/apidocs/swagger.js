const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const path = require('path');


const options = {
  swaggerDefinition: {
    info: {
      title: 'API 명세',
      version: '1.0.0',
      description: 'MILTY API Description',
    },
    host: 'nyan101-ideal-broccoli-wr949769p6vh9p7p-5000.preview.app.github.dev',
    basePath: '/api/'
  },
  apis: [path.resolve(__dirname, "../routes/api.router.js")]
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
