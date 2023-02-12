const express = require("express");
const Posts = require("../db/file");
const router = express.Router();
module.exports = router;

// Liste les posts
router.get("/", function (req, res) {
  res.send(Posts.loadPosts());
});

router.get("/posts", function (req, res) {
  res.send(Posts.loadPosts());
});

// Affiche le poste avec l'aticle x
router.get("/posts/:id", function (req, res) {
  const id = req.params.id;
  res.send(Posts.getPost(id));
});

// Crée un post
router.post("/post", function (req, res) {
  res.send(Posts.post());
});

// Edite le post avec l'aticle x
router.patch("/post/:id", function (req, res) {
  const id = req.params.id;
  res.send(Posts.editPost(id, req.body));
});

// Supprime le post avec l'aticle x
router.delete("/post/:id", function (req, res) {
  const id = req.params.id;
  res.send(Posts.deletePost(id));
});

/***************************************/
router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
