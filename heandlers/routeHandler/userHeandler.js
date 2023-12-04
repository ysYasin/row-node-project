/**
 * title : user handler
*/

// module scaffolding;
const handler = {}

handler.userHeandler = (requestproperties, callback) => {

    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestproperties.method) > -1) {
        console.log(requestproperties.method);
        handler._user[requestproperties.method](requestproperties, callback);
    } else {
        callback(405)
    }

}
handler._user = {};
handler._user.get = (requestproperties, callback) => {
    callback(200)
}
handler._user.post = (requestproperties, callback) => {
    // callback({ 'myLove': 'Meghla' })
}
handler._user.put = (requestproperties, callback) => {
    // callback({ 'myLove': 'Meghla' })
}
handler._user.delete = (requestproperties, callback) => {
    // callback({ 'myLove': 'Meghla' })
}


module.exports = handler;