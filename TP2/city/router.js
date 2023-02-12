const { response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
module.exports = router;
const data = require("./db/data.js");

// Get routes //

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

router.get("/cities", (req, res) => {
  res.send(data.getCities());
});

router.get("/cities/:id", (req, res) => {
  res.send(data.getCities(req.params.id));
});

router.get("/cities/:id/customers", (req, res) => {
  res.send(data.getCityCustomers(req.params.id));
});

router.get("/customers/:id", (req, res) => {
  res.send(data.getCustomers("", req.params.id));
});

// Post routes //

router.post("/customer", (req, res) => {
  res.send(data.postCustomer(req.body.name, req.body.cities));
});

router.post("/city", (req, res) => {
  res.send(data.postCity(req.body.name));
});

// Patch routes //

router.patch("/customer/:id", (req, res) => {
  res.send(data.patchCustomer(req.params.id, req.body.cities));
});

router.patch("/city/:id", (req, res) => {
  res.send(
    data.patchCity(
      req.params.id,
      req.body.name,
      req.body.area,
      req.body.population
    )
  );
});

// Delete routes //
router.delete("/customer/:id", (req, res) => {
  res.send(data.deleteCustomer(req.body.id));
});

router.delete("/city/:id", (req, res) => {
  res.send(data.deleteCity(req.params.id));
});

// use //

router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
