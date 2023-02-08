const e = require("express");
const { all, get } = require("../router");

module.exports = { getCustomers, getCities, getCityCustomers, postCustomer };

let customers = [
  {
    id: 1,
    name: "John",
    cities: [
      { id: 1, name: "Paris", area: 105, population: 2140 },
      { id: 3, name: "Warsaw", area: 517, population: 1778000 },
      { id: 2, name: "Dublin", area: 115, population: 555000 },
    ],
  },
  {
    id: 3,
    name: "Jane",
    cities: [{ id: 2, name: "Dublin", area: 115, population: 555000 }],
  },
  { id: 2, name: "Jack" },
  {
    id: 3,
    name: "Jill",
    cities: [{ id: 2, name: "Dublin", area: 115, population: 555000 }],
  },
  {
    id: 4,
    name: "John",
    cities: [
      { id: 3, name: "Warsaw", area: 517, population: 1778000 },
      { id: 2, name: "Dublin", area: 115, population: 555000 },
    ],
  },
];
let cities = [
  { id: 1, name: "Paris", area: 105, population: 2140000 },
  { id: 2, name: "Dublin", area: 115, population: 555000 },
  { id: 3, name: "Warsaw", area: 517, population: 1778000 },
  { id: 4, name: "Lisbon", area: 100, population: 506000 },
];

function getCustomers(
  fields = ["all"],
  id = 0,
  name = "",
  city = 0,
  sortBy = "noSort"
) {
  var result = customers
    .filter((customer) => (id ? customer.id === +id : customer))
    .filter((customer) => (name ? customer.name === name : customer))
    .filter((customer) =>
      city
        ? customer.hasOwnProperty("cities")
          ? customer.cities.some((ct) => ct.id === +city)
          : null
        : customer
    );
  if (sortBy === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  // .filter((customer) => (city ? customer.cities.id === city : customer));

  return result;
}

function getCities(...args) {
  var id = +args[0] || "";
  return cities.filter((c) => (id ? c.id === id : c));
}

function getCityCustomers(cityId) {
  var result;
  var selectedCity = cities.find((c) => c.id === +cityId);
  var customersFound = [];
  result = customers
    .filter((c) => c.hasOwnProperty("cities"))
    .filter((c) => c.cities.some((ct) => ct.id === +cityId));
  result.forEach((r) => customersFound.push({ id: r.id, name: r.name }));
  return customersFound;
}

function postCustomer(name, ...citiesIds) {
  newCustomer = {
    id: customers.findLast((c) => c.id > 0).id + 1,
    name: name,
  };
  customers.push(newCustomer);
  console.log(cities.filter((c) => citiesIds.some((c) => c.id) === true));
  return newCustomer;
}
