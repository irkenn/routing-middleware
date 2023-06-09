const express = require("express");
const app = express();
const itemRoutes = require('./routes/routes');
const ExpressError = require('./expressError');


app.use(express.json());
app.use("/items", itemRoutes);

/** 404 handler */

app.use(function(req, res, next){
    return new ExpressError("Not found", 404);
})

/** general error handlers */

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});


module.exports = app;