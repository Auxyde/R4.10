const express = require("express");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil");
});

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
