/**
 * title : sample handler
*/

// module scaffolding;
const handler = {}

handler.sampleHandler = (requestproperties, callback) => {
    console.log(requestproperties);
    callback(200, {
        message: "simple heandler is working"
    });
}

module.exports = handler;