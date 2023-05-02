const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    //make all fields mandotory
    if (!username||!email||!password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    //check if user exists
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists")
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create a new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.json({message:"register"})
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandotory");
    }
    //find the user
    const user = await User.findOne({email});
    //compare the password and check if it matches
    if (user && (await bcrypt.compare(password, user.password))) {
        
        //generating an access token
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.SECERET_KEY,
        {expiresIn: "10m"}
        );
        res.status(200).json({accessToken: accessToken});
    } else {
        res.status(401);
        throw new Error("Email or password not valid")
    }
    res.json({message: "login"})
})

const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user)
})

module.exports = {registerUser, currentUser, login}