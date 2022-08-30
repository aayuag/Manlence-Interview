const userModel = require("../models/userModel.js")
const express = require("express")
const { checkExistingUser, generatePasswordHash } = require("../utility");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const router = express.Router()

router.post("/register",body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
        if (await checkExistingUser(req.body.email)) {
            res.status(400).send("Useremail exist. Please try with different email");
        } else {
            generatePasswordHash(req.body.password).then((passwordHash) => {
                userModel.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: passwordHash,
                }).then((data) => {
                    res.status(200).send(data);
                }).catch((err) => {
                    res.status(400).send(err.message)
                })
            });
        }
    }

    

});

router.post("/login",body('email').isEmail(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
        userModel.find({email: req.body.email }).then((userData) => {
            // console.log(userData)
            if (userData.length) {
                bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                    if (val) {
                        const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                        res.status(200).send({ authToken });
                    } else {
                        res.status(400).send("Invalid Password");
                    }
                })
            } else {
                res.status(400).send("No user with given Details")
            }
        })
    }
    
});

router.post("/logout", (req, res) => {
    res.status(200).send("logout works");
});


module.exports = router