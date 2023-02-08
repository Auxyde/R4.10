const { response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
module.exports = router;
const data = require("./db/data.js");

router.post("/customer", (req, res) => {
  res.send(data.postCustomer(req.body.name, req.body.cities));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".\\html\\index.html"));
});

router.get("/customers", (req, res) => {
  res.send(
    data.getCustomers(
      req.query.fields,
      req.query.id,
      req.query.name,
      req.query.city,
      req.query.sort
    )
  );
});

// router.get("/customers/:id", (req, res) => {});

// router.get("/customers/:id/customers", (req, res) => {});

router.get("/cities", (req, res) => {
  res.send(data.getCities());
});

router.get("/cities/:id", (req, res) => {
  res.send(data.getCities(req.params.id));
});

router.get("/cities/:id/customers", (req, res) => {
  res.send(data.getCityCustomers(req.params.id));
});

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
