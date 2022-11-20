const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

router.post("/", function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;

  knex("users")
    .where({
      name: username,
      password: password,
    })
    .select("*")
    .then((results) => {
      if (results.length === 0) {
        res.render("signin", {
          title: "Sign in",
          errorMessage: ["ユーザが見つかりません"],
          isAuth: isAuth,
        });
      } else {
        // req.session.[セッション名] = [データ] とすることでセッションに保存
        req.session.userid = results[0].id;
        res.redirect("/");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signin", {
        title: "Sign in",
        errorMessage: [err.sqlMessage],
        isAuth: false,
      });
    });
});

module.exports = router;
