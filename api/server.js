const express = require("express");

const server = express();

const accountsRouter = require('../Accounts/accountsRouter');

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req,res)=>{
    res.status(200).json({message: "### Server running ###"});
});

module.exports = server;
