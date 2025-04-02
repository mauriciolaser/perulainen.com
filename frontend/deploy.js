// deploy.js
const { DEPLOY_FTP_USER, DEPLOY_FTP_PASSWORD, DEPLOY_FTP_HOST, DEPLOY_FTP_PORT, DEPLOY_FTP_PATH } = require('./config');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  user: DEPLOY_FTP_USER,
  password: DEPLOY_FTP_PASSWORD,
  host: DEPLOY_FTP_HOST,
  port: DEPLOY_FTP_PORT,
  localRoot: __dirname + "/build",         // Carpeta donde se genera tu build de React
  remoteRoot: DEPLOY_FTP_PATH,              // Ruta remota en tu hosting
  include: ["*", "**/*"],                   // Sube todo lo que hay en /build
  deleteRemote: false,                      // Si quieres borrar archivos viejos en el servidor, pon true
  forcePasv: true
};

ftpDeploy.deploy(config)
  .then(() => console.log("¡Deploy finalizado!"))
  .catch(err => console.error("Error en el deploy:", err));
