const { response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
module.exports = router;
const data = require("./db/data");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".\\html\\index.html"));
});

router.get("/students", (req, res) => {
  res.send(data.getStudents());
});

router.get("/students/:id", (req, res) => {
  res.send(data.getStudent(req.params.id));
});

router.post("/student", (req, res) => {
  res.send(data.insertStudent(req.body.name, req.body.address));
});

router.patch("/student/:id", (req, res) => {
  res.send(data.updateStudent(req.params.id, req.body.name, req.body.address));
});

router.delete("/student/:id", (req, res) => {
  res.send(data.removeStudent(req.params.id));
});

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
