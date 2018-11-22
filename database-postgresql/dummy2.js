var db = require("../database-mysql/index.js");
const faker = require("faker");
const knex = require("knex")({
  client: "pg",
  version: 10.5,
  connection: {
    host: "127.0.0.1",
    database: "listings"
  }
});

var namesArr = [];
var roomsArr = [
  "ENTIRE APARTMENT",
  "ENTIRE LOFT",
  "PRIVATE ROOM IN TOWNHOUSE",
  "PRIVATE ROOM IN APARTMENT",
  "PRIVATE ROOM",
  "PRIVATE ROOM IN GUEST SUITE"
];
var roomDetailsArr = [];
var citiesArr = [];
var sentencesArr = [];
var paragraphsArr = [];

(function dataGenerator() {
  for (var i = 0; i < 100; i++) {
    namesArr.push(faker.fake("{{name.firstName}} {{name.lastName}}"));
    roomDetailsArr.push(faker.fake("{{lorem.words}} {{lorem.words}}"));
    citiesArr.push(faker.address.city());
    sentencesArr.push(faker.lorem.sentence());
    paragraphsArr.push(faker.lorem.paragraph());
  }
})();

function DataObj() {
  this.name = namesArr[Math.floor(Math.random() * namesArr.length)];
  this.room_type = roomsArr[Math.floor(Math.random() * roomsArr.length)];
  this.room_type_details =
    roomDetailsArr[Math.floor(Math.random() * roomDetailsArr.length)];
  this.city = citiesArr[Math.floor(Math.random() * citiesArr.length)];
  this.city_details =
    sentencesArr[Math.floor(Math.random() * sentencesArr.length)];
  this.listing_details =
    paragraphsArr[Math.floor(Math.random() * paragraphsArr.length)];
  this.guest_access_details =
    sentencesArr[Math.floor(Math.random() * sentencesArr.length)];
  this.interaction_guests_details =
    sentencesArr[Math.floor(Math.random() * sentencesArr.length)];
  this.other_details =
    sentencesArr[Math.floor(Math.random() * sentencesArr.length)];
}

// create an array of objs

let seedPost = async () => {
  let start = Date.now();
  for (var i = 0; i < 10000; i++) {
    var insertArr = [];

    for (var j = 0; j < 1000; j++) {
      let data = new DataObj();
      insertArr.push(data);
    }

    try {
      await knex("listings").insert(insertArr);
      console.log("complete");
    } catch (err) {
      console.log(err);
    }
  }
  var end = Date.now();
  console.log((end - start) / 1000 / 60);
};

seedPost();
