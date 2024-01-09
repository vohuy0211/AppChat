import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";

const connectMysql = new Sequelize(
  dbConfig.db.DATABASE,
  dbConfig.db.USER,
  dbConfig.db.PASSWORD,
  {
    host: dbConfig.db.HOST,
    dialect: dbConfig.db.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  },
);

export default connectMysql;
