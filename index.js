/**
import { environment } from './heandlers/handleEnvironment/environment';
 * tittle : Uptime Monitoring Application
 * a Restfull API to monitoring up\down of user defiend Link
 * Aouthor : Yasin Arafat
 * date : 12-02-23
 */

// dependies
const http = require('http');
const { requestHandler } = require('./healpers/reqandres')
const environment = require('./heandlers/handleEnvironment/environment')
const lib = require('./lib/data');

//@TODO : delate in future;
const myDatas = { name: 'yasin', age: 25, love: "meghla" }
const updateDatas = { name: 'meghla', age: 22, love: "yasin" }

// lib.create('myData', 'UserInformations', myDatas, (err) => {
//     if (err) { console.log(err); }
// })

// lib.read('myData', 'UserInformations', (err, data) => {
//     console.log(err, data);
// })
// lib.update('myData', 'UserInformations', updateDatas, (err) => {
//     console.log(err);
// })
// lib.delete('myData', 'UserInformations', (err) => {
//     console.log(err);
// })

// app object -> scaffold
const app = {};

// APP config
app.config = {
    port: 4000,
}

// creat http server
app.createServer = () => {
    const server = http.createServer(app.reqresHandler)
    server.listen(environment.port, () => {
        console.log(`server listening on ${environment.port}`);
    })
}


// reques and response handler
app.reqresHandler = requestHandler;

// run the server
app.createServer()