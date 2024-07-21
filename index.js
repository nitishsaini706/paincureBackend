const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const dotenv = require('dotenv');
const {client} = require('./db/connection')

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;
const swaggerDocument = YAML.load('./swagger.yaml');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const myFunc = async () => {
  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected to PostgreSQL');

    app.use('/', routes);
    app.get("/", async (req, res) => {
      res.send("Server working fine. Please visit /api-docs for docs");
    });

    // Swagger API documentation setup
    if (swaggerDocument) {
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } else {
      console.error('Swagger document not loaded. Check YAML file path.');
    }

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: err.message });
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  }catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
    process.exit(1); // Exit with failure status
  }
}

myFunc();

// module.exports = client; // Export the PostgreSQL client if needed in other parts of the application
