const express = require("express");
const todoListRoutes = express.Router();

const dbo = require("../db/conn");

todoListRoutes.route("/todoList").get((req, res) => {
    let db_connect = dbo.getDb("todos");
    db_connect
        .collection("todo_list")
        .find()
        .sort({ id: -1 })
        .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

todoListRoutes.route("/todoList/add").post((req, response) => {
    let db_connect = dbo.getDb();
    let todo = {
        id: req.body.id,
        text: req.body.text,
        completed: req.body.completed
    };
    db_connect.collection("todo_list").insertOne(todo, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

todoListRoutes.route("/todoList/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let query = { id: parseInt(req.params.id) }
    db_connect.collection("todo_list").deleteOne(query, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

todoListRoutes.route("/todoList/update/:id").put((req, response) => {
    let db_connect = dbo.getDb();
    let new_values = {
        $set: {
            text: req.body.text,
            completed: req.body.completed
        },
    };
    let query = { id: parseInt(req.params.id) };
    db_connect.collection("todo_list").updateOne(query, new_values, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = todoListRoutes;