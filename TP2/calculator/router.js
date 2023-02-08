const { response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
module.exports = router;

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "\\index.html"));
});

router.post("/", (req, res) => {
  if (req) {
    console.log(req.body);
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    if (Number.isInteger(Number(num1)) && Number.isInteger(Number(num2))) {
      res.send(`Result: ${Number(num1) + Number(num2)}`);
    } else {
      console.log("Num 1 :" + num1 + " = " + Number.isInteger(num1));
      console.log("Num 2 :" + num2 + " = " + Number.isInteger(num2));
      console.log("Erreur : L'un des éléments n'est pas un Entier");
    }
  }
});

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
