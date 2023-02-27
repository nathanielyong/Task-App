const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.route("/signup").post(async (req, res) => {
    try {
        password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: password
        });
        await user.save();
    } catch (err) {
        console.log(err);
        if (err.errors) {
            const errorMessages = {
                username: (err.errors.hasOwnProperty('username') ? err.errors.username.properties.message : null),
                email: (err.errors.hasOwnProperty('email') ? err.errors.email.properties.message : null)
            }
            res.status(400).json(errorMessages);
        } else if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const message = `${field} already in use`;
            const errorMessage = {
                [field]: message
            }
            res.status(400).json(errorMessage);
        }
    }
});

router.route("/login").post(async (req, res) => {
    const user = await User.findOne({ $or: [{ username: req.body.identifier }, { email: req.body.identifier }], });
    if (!user) {
        return res.status(401).send({ message: 'Username or password incorrect' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Username or password incorrect' });
    }
    const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({ token });
});

module.exports = router;