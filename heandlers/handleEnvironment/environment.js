/**
 * tittle : handle all environments
 * a Restfull API to monitoring up\down of user defiend Link
 * Aouthor : Yasin Arafat
 * date : 12-02-23
 */

// module scaffold
const environment = {};

environment.staging = {
    port: 3000,
    envName: "staging",
};
environment.production = {
    port: 5000,
    envName: "production",
};
const portName = process.env.NODE_ENV;
const currentEnvironment = typeof (portName) === "string" ? portName : "staging";

const environmentTOExport =
    typeof (environment[currentEnvironment]) === "object"
        ? environment[currentEnvironment]
        : environment.staging;


//export environment
module.exports = environmentTOExport