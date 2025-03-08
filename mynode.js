import { writeFile } from 'fs';
import * as dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

// Define la estructura del objeto de entorno según tus necesidades
const environmentFile = `export const environment = {
  production: true,
  SUPABASE_URL: '${process.env.SUPABASE_URL || ""}',
  SUPABASE_KEY: '${process.env.SUPABASE_KEY || ""}',
};`;

// Escribe las variables al archivo de entorno
writeFile('./src/environments/environment.ts', environmentFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log('Variables de entorno generadas correctamente');
  }
});