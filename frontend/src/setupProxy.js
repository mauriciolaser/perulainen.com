const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const target = process.env.REACT_APP_PROXY_TARGET;
  
  if (!target) {
    console.error("No se ha definido REACT_APP_PROXY_TARGET. Por favor, establece esta variable de entorno.");
    process.exit(1);
  }

  app.use(
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
};
