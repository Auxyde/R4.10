const e = require("express");
const { all, get, patch } = require("../router");

module.exports = {
  getCustomers,
  getCities,
  getCityCustomers,
  postCustomer,
  postCity,
  patchCustomer,
  deleteCustomer,
  patchCity,
  deleteCity,
};

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

// Get functions

function getCustomers(...args) {
  var fields = args[0] ? args[0].split(",") : ["id", "name", "cities"];
  var id = args[1] || 0;
  var name = args[2] || "";
  var city = args[3] || 0;
  var sortBy = args[4] || "";

  //Filter id, names and cities
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

  //Sort
  if (sortBy && result.length > 1) {
    sortBy === "name"
      ? result.sort((c1, c2) =>
          c1[sortBy].toString().localeCompare(c2[sortBy].toString())
        )
      : result;
    sortBy === "id" ? result.sort((c1, c2) => c1 - c2) : result;
  }
  //Reduce to see only fields wanted
  result = result.map((customer) => {
    let newCustomer = {};
    fields.flatMap((field) => {
      if (customer[field] != null) {
        newCustomer[field] = customer[field];
      }
    });
    return newCustomer;
  });

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

// Post functions //

function postCustomer(name, citiesIds) {
  citiesIds = citiesIds ? citiesIds.split(",") : null;
  citiesIds = citiesIds.flatMap((c) => +c); // Convert to int the cities Id

  let foundCities = cities.filter((ct) =>
    citiesIds.includes(ct.id) ? ct : null
  );
  console.log(foundCities);
  let newCustomer = {
    id: customers.findLast((c) => c.id > 0).id + 1,
    name: name,
    cities: foundCities,
  };

  customers.push(newCustomer);
  return newCustomer;
}

function postCity(name) {
  let city = {
    id: cities[cities.length - 1].id + 1,
    name: name,
    area: NaN,
    population: NaN,
  };
  cities.push(city);
  return city;
}

// Patch functions //

function patchCustomer(id, name, citiesIds) {
  let modifiedCustomer = {};
  let cIds = citiesIds ? citiesIds.split(",") : null;

  //Check if the customer exists else, return error
  if (!customers.some((c) => c.id === +id)) {
    return "Customer not found";
  }

  customerIndex = customers.findIndex((c) => c.id === +id);

  if (name) {
    customers[customerIndex].name = name;
  }

  if (cIds) {
    let foundCities = cities.filter((ct) =>
      citiesIds.includes(ct.id) ? ct : null
    );
    customers[customerIndex].cities = foundCities;
  }

  return customers[customers.findIndex((c) => c.id === +id)];
}

function patchCity(id, name, area, population) {
  let cityIndex = cities.findIndex((c) => c.id === +id);
  if (cityIndex === -1) return "City not found";

  if (name) {
    cities[cityIndex].name = name;
  }
  if (area) {
    cities[cityIndex].area = area;
  }
  if (population) {
    cities[cityIndex].population = population;
  }
  return cities;
}

// Delete functions //

function deleteCustomer(id) {
  let customerIndex = customers.findIndex((c) => c.id === +id);
  let customer = customers[customerIndex];
  customers.splice(customerIndex, 1);
  return "Customer " + customer.name + " deleted";
}

function deleteCity(id) {
  let cityIndex = cities.findIndex((c) => c.id === +id);

  // Check if the city has customers
  customers.forEach((c) => {
    if (c.cities ? c.cities.some((ct) => ct.id === +id) : false) {
      let cityIndex = c.cities.findIndex((ct) => ct.id === +id);
      c.cities.splice(cityIndex, 1);
    }
  });

  cities.splice(cityIndex, 1);
  return "The city has been deleted";
}
