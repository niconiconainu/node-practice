const express = require('express');
const router = express.Router();

let todos = [];

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ToDo App',
    todos: todos,
  });
});

router.post('/', function (req, res, next) {
  const todo = req.body.add;
  todos.push(todo);
  res.redirect('/');
});

module.exports = router;