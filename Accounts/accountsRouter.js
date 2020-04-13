const express = require('express');

const router = express.Router();

const db = require("../data/dbConfig");

//GET api/accounts
router.get('/', (req,res) => {
    //lookup on Knex.js org
            //no limit, sort by id, 
    const { limit = null, sortby='id'} = req.query;
    db('accounts')
        .limit(limit)
        .orderBy(sortby)
        .then(accounts => {
            res.status(200).json(accounts);
        })
            .catch(err => res.status(500).json({errorMessage: "Could not get any accounts from the database."}));
});

//GET by id
router.get('/id:', (req,res) => {
    const {id} = req.params;

    db('accounts')
        .where({id})
        .first()
        .then(account => {
            if(account.length){
                res.status(200).json(account);
            }else{
                res.status(400).json({errorMessage: "Could not find account with that ID;"});
            }
        })
            .catch(err =>
                res.status(500).json({errorMessage: "Could not get any accounts from the database."})); 
});

//POST
router.post('/', (req, res) => {
    if(req.body.name && req.body.budget){
        db('accounts')
            .insert(req.body, "id")
            .then(id => db('accounts')
            .where({id: id[0]})
            .first())
            .then(account => {
                res.status(200).json(account);
        })
            .catch(err => res.status(500).json({errorMessage: "Could not update the database."}));
                } else {
                    res.status(404).json({message: "Missing data. Did you fill in all information?"});
            }
});

//PUT
router.put('/id:', (req,res) => {
    if(req.body.name || req.body.budget){
        db('accounts')
            .where({id: req.params.id})
            .then(count => {
                if(count){
                    db('accounts')
                        .where({id: req.params.id})
                        .first()
                        .then(account => {
                            res.status(200).json(account);
                        })
                     
                        .catch(err => res.status(500).json({errorMessage: "Could not update that account."}));
                            } else {
                        res.status(400).json({message: "Could not find that account."})
                        }
                    })
                     .catch(err => res.status(500).json({errorMessage: "Could not update that account."}));
                    } else {
                        res.status(400).json({message: "Missing data. Did you fill in all information?"})
                    }
});

//DELETE
router.delete('/id:',(req,res) => {
    const {id} = req.params;
        db('accounts')
            .where({id})
            .delete()
            .then(count => {
                if(count){
                    res.status(200).json({message: "Account successfully created."});
                }else{
                    res.status(400).json({message:"Something went wrong, did you enter the correct id?"});
                }
            })
                .catch(err =>
                    res.sendStatus(500).json({errorMessage: "Could not delete that account."}));
});

module.exports = router;