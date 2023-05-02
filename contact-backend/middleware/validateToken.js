const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    //get the token from the header
    let authHeader = req.headers.authorization || req.headers.Authorization
    //check for the token
    if (authHeader && authHeader.startsWith("Bearer")) {
        //since the token is after the word bearer and a space
        token = authHeader.split(" ")[1];
        //verify the token
        jwt.verify(token, process.env.SECERET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
          }
    }
})

module.exports = validateToken;