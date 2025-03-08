const fs = require('fs');
const colors = require('colors');
require('dotenv').config();

const targetPath = './src/environments/environment.prod.ts';

// Contenido del archivo environment.prod.ts
const environment = `export const environment = {
  production: true,
  BASE_URL: 'https://apprendre-backend.onrender.com',
  SUPABASE_URL: '${process.env.SUPABASE_URL || ''}',
  SUPABASE_KEY: '${process.env.SUPABASE_KEY || ''}'
};
`;

console.log(colors.magenta('Generando archivo environment con variables de entorno...'));

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(colors.green(`Environment.prod.ts generado en ${targetPath}`));
  }
});