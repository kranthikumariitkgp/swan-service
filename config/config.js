const appName = 'swan-microservice';
const port = 3000;

const mongo = {
    "baseURL": "mongodb://localhost:27017/",
    "dbName": "swan-service",
    "debug": "true",
    "username": "swanUsername",
    "password": "Test@123",
    "poolSize": 10,
    "authSource": "swan-service"
};

module.exports =
{ appName, port, mongo };
