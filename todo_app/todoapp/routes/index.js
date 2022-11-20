const express = require("express");
const mysql = require("mysql");
const knex = require("../db/knex");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "todo_app",
});

const router = express.Router();

router.get("/", function (req, res, next) {
  // セッションに保存されているユーザIDを格納する定数(userId)を用意
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  console.log(`isAuth: ${isAuth}`);

  knex("tasks")
    .select("*")
    .then(function (results) {
      console.log(results);
      res.render("index", {
        title: "ToDo App",
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "ToDo App",
        isAuth: isAuth,
      });
    });
});

router.post("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const todo = req.body.add;
  knex("tasks")
    .insert({ user_id: 1, content: todo })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "ToDo App",
        isAuth: isAuth,
      });
    });
});

router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use('/logout', require('./logout'));

module.exports = router;

// SQLで記述した時
// router.get('/', function (req, res, next) {
//   connection.query(
//     `select * from tasks;`,
//     (error, results) => {
//       console.log(error);
//       console.log(results);
//       res.render('index', {
//         title: 'ToDo App',
//         todos: results,
//       });
//     }
//   );
// });

// router.post('/', function (req, res, next) {
//   connection.connect((err) => {
//     if (err) {
//       console.log('error connecting: ' + err.stack);
//       return
//     }
//     console.log('success');
//   });
//   const todo = req.body.add;
//   connection.query(
//     `insert into tasks (user_id, content) values (1, '${todo}');`,
//     (error, results) => {
//       console.log(error);
//       res.redirect('/');
//     }
//   );
// });
