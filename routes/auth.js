const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.route("/api/signup").post(async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user)
            return res.status(400).json({ username: 'Username taken' });

        user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).json({ email: 'Email already registered' });

        password = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: password
        });
        res.status(201).json({ message: 'user successfuly registered' });
    } catch (err) {
        return res.status(500).json({ message: "Validation error" })
    }
});

router.route("/api/login").post(async (req, res) => {
    const user = await User.findOne({ $or: [{ username: req.body.identifier }, { email: req.body.identifier }], });
    if (!user) {
        return res.status(401).send({ message: 'Username or password incorrect' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Username or password incorrect' });
    }
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '365d' });
    res.status(201).json({ token });
});

module.exports = router;