const express = require('express');
const router = new express.Router();
const middleware = require('../middleware');
let items = require("../fakeDb");


router.get('/', middleware.returnAllItems, (req, res, next) => {
    //Should render a list of shopping items [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}] 
})

router.post('/', middleware.addItem, (req, res, next) => {
    //Should accept a JSON and add it to the shopping list return a JSON with 'added'  {“added”: {“name”: “popsicle”, “price”: 1.45}}
})

router.get('/:name', middleware.findItem, (req, res, next) =>{
    // Modify a single item name/price, return JSON “updated”: {“name”: “new popsicle”, “price”: 2.45}}
})

router.patch('/:name', middleware.modifyItem, (req, res, next) =>{
    // Modify a single item name/price, return JSON “updated”: {“name”: “new popsicle”, “price”: 2.45}}
})

router.delete('/:name', middleware.deleteItem, (req, res, next) =>{
    //{message: “Deleted”}
})

module.exports = router;