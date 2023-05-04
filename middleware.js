const ExpressError = require("./expressError");
let items = require("./fakeDb");

function returnAllItems(req, res, next){
    res.json(items);
    return next();
}

function addItem(req, res, next){
    try {
        if (req.body.name && req.body.price){
            req.body.price = Number(req.body.price);
            items.push(req.body);
            res.json( { added : req.body} );
            return next();
        }  
    }
    catch(e){
        return next(e)
    }
}

function modifyItem(req, res, next){
    try{
        console.log('req.body.name', req.body.name);
        console.log('req.params.name', req.params.name);
        for (let i in items){
            if (items[i]["name"] == req.params.name){
                
                items[i]['name'] = req.body.name;
                req.body.price = Number(req.body.price);
                items[i]['price'] = req.body.price;
                res.json( { updated : req.body} );
                return next();
                }
        }
        return next({message:'Item not found', status:404});
    }
    catch(e){
        return next(e);
    }
}

function findItem(req, res, next){
    try{
        for (let i in items){
            if (items[i]['name'] == req.params.name){
                res.json(items[i]);
                return next();
            }
        }
        return next({message:'Item not found', status:404});
    }
    catch(e){
        return next(e);
    }
}

function deleteItem(req, res, next){
    try{
        for (let i in items){
            if (items[i]['name'] == req.params.name){
                items.splice(i, 1);
                res.json({ message: "Deleted" });
                return next();
            }
        }
        return next({message:'Item not found', status:404});
    }
    catch(e){
        return next(e);
    }
}

module.exports = { returnAllItems, addItem, modifyItem, findItem, deleteItem };