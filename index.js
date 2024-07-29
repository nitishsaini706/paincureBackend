const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const dotenv = require('dotenv');
dotenv.config(); 
const fs = require('fs');
const dir = './uploads';

const app = express();
const port = process.env.PORT || 3001;
const swaggerDocument = YAML.load('./swagger.yaml');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


(async function(){try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
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
    console.error('Error server starting:', error.message);
    process.exit(1); // Exit with failure status
  }
  }())

  // async function connect(retry = 0) {
  //   try {
      
  //   console.log('client', client)
  //     await client.connect();
  //     console.log('stats', stats)
  //     if (stats._connected) {
  //       console.log("Connected to the database successfully.");
  //       return stats;
  //     }
  //   } catch (e) {
  //     console.error("Database connection failed:", e );
      
  //     if (retry < 2) { 
  //       console.log(`Retrying... ${retry + 1}`);
  //       return connect(retry + 1); 
  //     } else {
  //       console.log("Max DB retry limit reached.");
  //       throw new Error("Failed to connect to the database after multiple attempts.");
  //     }
  //   }
  // }
  

// module.exports = client; // Export the PostgreSQL client if needed in other parts of the application
