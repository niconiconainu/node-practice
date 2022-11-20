const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.get('/', function (req, res, next) {
  const userId = req.session.userid;
const isAuth = Boolean(userId);
  res.render('signup', {
    title: 'Sign up',
    isAuth: isAuth,
  });
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  knex("users")
    .where({name: username})
    .select("*")
    .then(function (result) {
      if (result.length !== 0) {
        res.render("signup", {
          title: "Sign up",
          errorMessage: ["このユーザ名は既に使われています"],
          isAuth: isAuth,
        }) 
      } else if (password === repassword) {
        knex("users")
          .insert({name: username, password: password})
          .then(function () {
            res.redirect("/");
          })
          .catch(function (err) {
            console.error(err);
            res.render("signup", {
              title: "Sign up",
              errorMessage: [err.sqlMessage],
            });
          });
      } else {
        res.render("signup", {
          title: "Sign up",
          errorMessage: ["パスワードが一致しません"],
          isAuth: isAuth,
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signup", {
        title: "Sign up",
        errorMessage: [err.sqlMessage],
        isAuth: isAuth,
      });
    });
});

module.exports = router;