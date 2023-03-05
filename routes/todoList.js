const express = require("express");
const TodoItem = require("../models/TodoItem");
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware.js');

router.route("/api/todoList").get(authMiddleware, async (req, res) => {
    const todoItems = await TodoItem.find({ user: req.user.id }).sort({ date: 1 });
    try {
        res.send(todoItems);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.route("/api/todoList/:id").get(authMiddleware, async (req, res) => {
    const todoItem = await TodoItem.findById(req.params.id);
    try {
        res.send(todoItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.route("/api/todoList/add").post(authMiddleware, async (req, res) => {
    const newItem = new TodoItem({ text: req.body.text, date: req.body.date, user: req.user.id, completed: req.body.completed });
    try {
        const savedItem = await newItem.save();
        res.send(savedItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.route("/api/todoList/delete/:id").delete(authMiddleware, async (req, res) => {
    try {
        await TodoItem.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.route("/api/todoList/update/:id").put(authMiddleware, async (req, res) => {
    try {
        const todoItem = await TodoItem.findByIdAndUpdate(req.params.id, req.body);
        res.send(todoItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;