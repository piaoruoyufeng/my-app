const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(createProxyMiddleware("/api1", {
        target: "http://localhost:5000/login",
        changeOrigin: true,
        pathRewrite: {
            "^/api1": "",
        }
    })),
    app.use(createProxyMiddleware("/api2", {
        target: "http://localhost:5000/register",
        changeOrigin: true,
        pathRewrite: {
            "^/api2": "",
        }
    }))
};