/**
 * titile : handleling request and response;
 * description :
 * author: yasin;
 * date: 12-3-23;
 */
//depandencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { notfoundHandler } = require('../heandlers/notfoundHandler')
const route = require('../routes')

// reqres object -> module csafolld
const reqAndres = {};

reqAndres.requestHandler = (req, res) => {
    // get url from req
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    const headerObj = req.headers;
    const method = req.method.toLowerCase();
    const queryStringObj = parsedUrl.query;
    const requestproperties = {
        parsedUrl,
        path,
        cleanPath,
        headerObj,
        method,
        queryStringObj,
    }

    // final decide the route, if requested route is avaiable in route then send that fuction, else seld NotFoundPage
    const choosenHandler = route[cleanPath] ? route[cleanPath] : notfoundHandler;
    // choosenhandler is now a fuction we'll give him tow parameter,
    // 1) request proparties object, 
    //second one for sending status code, and payload 
    choosenHandler(requestproperties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString)

    })

    // make a decoder
    const decoder = new StringDecoder('utf-8')

    let realData = ''
    req.on('data', (d) => {
        realData += decoder.write(d);
    })

    req.on('end', () => {
        decoder.end()
        console.log(realData);
        res.end('hello babu jan')
    })
}
module.exports = reqAndres;