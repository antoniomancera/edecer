import { writeFile } from 'fs';
import * as dotenv from 'dotenv';

// An example is available here https://medium.com/@lara.delrio333/deploy-an-angular-project-in-vercel-with-secret-environment-variables-74323925712d
dotenv.config();

const environmentFile = `export const environment = {
  production: true,
  SUPABASE_URL: '${process.env.SUPABASE_URL || ""}',
  SUPABASE_KEY: '${process.env.SUPABASE_KEY || ""}',
};`;

writeFile('./src/environments/environment.ts', environmentFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log('Variables de entorno generadas correctamente');
  }
});