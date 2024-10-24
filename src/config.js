import { config } from 'dotenv';
config();  // Carga las variables de entorno del archivo .env

export const database = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "libreria",
  port: process.env.DATABASE_PORT || 3306,
};

export const port = process.env.PORT || 4000;
export const SECRET = process.env.SECRET || 'some secret key';
