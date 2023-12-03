/**
 * title : notfound handler
*/

// module scaffolding;
const handler = {}

handler.notfoundHandler = (requestproperties, callback) => {
    callback(404, {
        message: "Page not found"
    });
}

module.exports = handler;