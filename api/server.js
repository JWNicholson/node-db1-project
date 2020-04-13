const express = require("express");

//const db = require("../data/dbConfig.js");
const server = express();

const accountsRouter = require('../Accounts/accountsRouter');

server.use(express.json());

server.use('api/accounts', accountsRouter);

server.get('/', (req,res) => {
    res.status(200).json({message: "\n### Server running ###\n"});
});

module.exports = server;
