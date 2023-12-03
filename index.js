/**
 * tittle : Uptime Monitoring Application
 * a Restfull API to monitoring up\down of user defiend Link
 * Aouthor : Yasin Arafat
 * date : 12-02-23
 */
// dependies
const http = require('http');
const { requestHandler } = require('./healpers/reqandres')

// app object -> scaffold
const app = {};

// APP config
app.config = {
    port: 4000,
}

// creat http server
app.createServer = () => {
    const server = http.createServer(app.reqresHandler)
    server.listen(app.config.port)
}

// reques and response handler
app.reqresHandler = requestHandler;

// run the server
app.createServer()