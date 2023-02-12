const { render } = require("ejs");
const express = require("express");
const Posts = require("../db/file");
const router = express.Router();
module.exports = router;

// page d'accueil
router.get("/", function (req, res) {
  res.render("pages/index", { posts: Posts.loadPosts() });
});
router.get("/posts", function (req, res) {
  res.render("pages/index", { posts: Posts.loadPosts() });
});

// page à propos
router.get("/about", function (req, res) {
  res.render("pages/about");
});

// page hello
router.get("/hello/:user", function (req, res) {
  const valeurSaisie = req.params.user;
  res.render("pages/index", { user: valeurSaisie });
});

// affiche le post avec l'aticle x
router.get("/post", function (req, res) {
  const id = req.query.id || "";
  const add = req.query.a || "";

  let post;

  if (id) {
    post = Posts.getPost(id);
    res.render("pages/post-read", { post });
  } else if (add) {
    res.render("pages/post-upd", { post });
  } else {
    res.redirect("/");
  }
});

// enregistre le partie modification / ajout d'un post
router.post("/post", function (req, res) {
  const id = req.query.id || "";
  const type = req.query.a || "";

  if (type === "save") {
    let post = Posts.editPost(id, req.body);
    res.redirect("/");
  } else if (type === "upd") {
    const post = Posts.getPost(id);
    res.render("pages/post-upd", { post });
  } else if (type === "del") {
    Posts.deletePost(id);
    res.redirect("/");
  } else {
    const post = id ? Posts.getPost(id) : null;
    res.render("pages/post-upd", { post });
  }
});
/***************************************/
router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
