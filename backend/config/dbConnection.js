import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config({ quiet: true });

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST_NAME,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    logging: false,
  }
);

export default sequelize;
