const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
var app = express();
const port = process.env.PORT || 4000;
// Définit ejs comme moteur de template
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);
app.listen(port, function () {
  console.log(`Serveur démarré sur le port ${port} !`);
});
