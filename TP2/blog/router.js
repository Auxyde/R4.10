const express = require("express");
const router = express.Router();
router.use("/api", require("./routes/api"));
router.use("/pages", require("./routes/pages"));
module.exports = router;
//page introuvable => page d'accueil
router.use((req, res) => {
  res.redirect("/pages");
});
