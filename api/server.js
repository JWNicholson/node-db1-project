const express = require("express");

//const db = require("../data/dbConfig.js");
const accountsRouter = require('../Accounts/accountsRouter');

const server = express();

server.use(express.json());

server.use('api/accounts', accountsRouter);

server.get('/', (req,res) => {
    res.status(200).json({message: "\n### Server running ###\n"});
});

module.exports = server;
