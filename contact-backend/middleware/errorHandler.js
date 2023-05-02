const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    //if status code is empty give it 500
    const statusCode = res.statusCode ? res.statusCode : 500; 
    console.log(err)
    //create a switch case using the status code
    switch (statusCode) {
        case constants.VALIDATION_ERROR: 
        res.json({
            title: "Validation Failed", 
            message: err.message,
            stackTrace: err.stack 
        })
        case constants.NOT_FOUND: 
        res.json({
            title: "Not Found",
            message: err.message,
            stackTrace: err.stack
            })
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            })
        case constants.FORBIDDEN:
            res.json({
                title:"Forbidden",
                message: err.message,
                stackTrace: err.stack
            })
        case constants.SERVER_ERROR:
            res.json({
                title:"Server Error",
                message: error.message,
                stackTrace: error.stack
            })
        default:
            console.log("No error, All good!");
            break;
    }
}


//export it
module.exports = errorHandler;