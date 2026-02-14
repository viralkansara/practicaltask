import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sequelize from './config/dbConnection.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/route.js'
import cors from "cors";
dotenv.config({ quiet: true });
import {addDefaultUser} from './services/user.js';
//create express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
sequelize
//cors configuration

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


//route related configuration
app.use("/api", routes);

//global error handler
app.use(errorHandler);

//db configuration
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Successfully connected mysql database');

    await addDefaultUser()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Database connection failed: ${error}`);
  }
}
startServer();

