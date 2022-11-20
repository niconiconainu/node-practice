const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    const userId = req.user.id;
    knex("tasks")
      .select("*")
      .where({user_id: userId})
      .then(function (results) {
        res.render('index', {
          title: 'ToDo App',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          isAuth: isAuth,
          errorMessage: [err.sqlMessage],
        });
      });
  } else {
    res.render('index', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }
});

router.post("/", function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const todo = req.body.add;
  knex("tasks")
    .insert({ user_id: userId, content: todo })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "ToDo App",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use("/logout", require("./logout"));

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
