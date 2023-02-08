const { maxHeaderSize } = require("http");

module.exports = {
  getStudents,
  getStudent,
  insertStudent,
  updateStudent,
  removeStudent,
};

const students = [
  {
    id: 1,
    name: "Jean-Paul BELMONDO",
    address: "Rue des mésanges 87000 Limoges",
  },
  { id: 2, name: "Pierre RICHARD", address: "Rue des perdrix 87000 Limoges" },
];

function getStudent(studentId) {
  return students.find((student) => student.id === studentId);
}

function getStudents() {
  return students;
}

function insertStudent(name, address) {
  console.log("Adding student");
  students.push({
    id: students[students.length - 1].id + 1,
    name: name,
    address: address,
  });
  console.log(students[students.length - 1]);
  return students[students.length - 1];
}

function updateStudent(studentId, name = "", address = "") {
  var resMsg = "Error : student id not found";

  if (students.map((student) => student.id).includes(+studentId)) {
    var student = students.filter((student) => student.id === +studentId)[0];
    console.log(students);
    console.log((address ||= student.address));

    students[studentId - 1] = {
      id: studentId,
      name: name || student.name,
      address: address || student.address,
    };
    resMsg = "Student updated successfully";
  }

  return resMsg;
}

function removeStudent(studentId) {
  console.log("Deleting student " + studentId);

  // students.map((student) => student.id).find((id) => id === studentId);
  // crée une map de tous les id des etudiants, puis find permet de
  // connaitre la position de l'élément dans le tableau
  var studentPos = students
    .map((student) => student.id)
    .find((id) => id === studentId);
  console.log("Student pos : " + studentPos);
  var resMsg = "Error : student id not found";

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
    resMsg = "Successfully deleted student " + studentId;
    console.log("Successfully deleted student " + studentId);
  } else {
    console.log("Error : student not found");
  }
  return resMsg;
}
