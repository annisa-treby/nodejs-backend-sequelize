const http = require('http');
const express = require('express');
const appMiddleware = require('./src/middlewares/app-middlewares');
const appRoutes = require('./routes/index');
const loggingListener = require('./event/logging.listener');
const logEvent = require('./event/myEmitters');

loggingListener();
const app = express();
app.use(appMiddleware);
app.use(appRoutes);

const server = http.createServer(app);
    server.on('error', function (e) {
    logEvent.emit('APP_ERROR', {
        logTitle:'APP-FAILED',
        logMessage: e
    })
    });

module.exports = server;