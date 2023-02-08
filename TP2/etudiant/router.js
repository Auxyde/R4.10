const { response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
module.exports = router;

const students = [
  {
    id: 1,
    name: "Jean-Paul BELMONDO",
    address: "Rue des mésanges 87000 Limoges",
  },
  { id: 2, name: "Pierre RICHARD", address: "Rue des perdrix 87000 Limoges" },
];

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".\\html\\index.html"));
});

router.get("/students", (req, res) => {
  res.send(students);
});
router.get("/students/:id", (req, res) => {
  res.send(students.find((student) => student.id === +req.params.id));
});

router.post("/student", (req, res) => {
  console.log("Student : added");
  students.push({
    id: students[students.length - 1] + 1,
    name: req.body.name,
    address: req.body.address,
  });
  console.log(`student : ${students[students.length - 1]}`);
  res.send(`New student: ${students[students.length - 1].id}`);
});

router.patch("/student/:id", (req, res) => {
  var studentId = +req.params.id;
  console.log("Patching student : " + studentId);

  // students.map((student) => student.id).find((id) => id === studentId);
  // crée une map de tous les id des etudiants, puis includes permet de savoir si l'élément
  // dans le tableau

  if (students.map((student) => student.id).includes(id)) {
    var student = students[studentId - 1];

    //
    students[studentId - 1] = {
      id: studentId,
      name: req.body.name || student.name,
      address: req.body.address || student.address,
    };
    res.send("Student updated successfully");
  } else {
    res.send("Error : student id not found");
  }
});

router.delete("/student/:id", (req, res) => {
  var studentId = +req.params.id;
  console.log("Deleting student " + studentId);

  // students.map((student) => student.id).find((id) => id === studentId);
  // crée une map de tous les id des etudiants, puis find permet de
  // connaitre la position de l'élément dans le tableau

  var studentPos = students
    .map((student) => student.id)
    .find((id) => id === studentId);
  console.log("Student pos : " + studentPos);

  // Si on a trouvé la position de l'élément dans le tableau alors la condition est validée
  // Sinon, .find retourne "undefined" ce qui renvoie un boolean false
  if (studentPos) {
    for (i = 0; i < students.length; i++) {
      if (i >= studentPos - 1) {
        console.log(students[i]);
        students[i] = students[i + 1];
      }
    }
    students.pop();
    res.send("Successfully deleted student " + studentId);
  } else {
    console.log("Error : student not found");
    res.send("Error : student id not found");
  }
});

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
