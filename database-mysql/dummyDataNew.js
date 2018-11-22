// var db = require("../database-mysql/index.js");
const faker = require("faker");
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "running1",
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
  this.user_name = namesArr[Math.floor(Math.random() * namesArr.length)];
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

let seedPost = async () => {
  let start = Date.now();
  console.log("start time: " + start / 1000);
  for (var i = 0; i < 10000; i++) {
    var insertArr = [];

    for (var j = 0; j < 1000; j++) {
      let data = new DataObj();
      insertArr.push(data);
    }

    await knex("listings").insert(insertArr);
  }
  var end = Date.now();
  console.log("end time: " + end / 1000);
  console.log("total time in minutes " + (end - start) / 1000 / 60);
};

seedPost();

// var size = 10000000;
// var count = 0;

// var outerWrapper = () => {
//   let start = Date.now();

//   var wrapper = () => {
//     if (count >= size) {
//       console.log("done");
//       var end = Date.now();

//       console.log((end - start) / 1000 / 60);
//       return;
//     }
//     var batchStart;
//     var promise = new Promise(function(resolve) {
//       batchStart = Date.now();

//       for (var i = 0; i < 20000; i++) {
//         count += 1;
//         let data = new DataObj();
//         db.insertAll(
//           data.name,
//           data.room_type,
//           data.room_type_details,
//           data.city,
//           data.city_details,
//           data.listing_details,
//           data.guest_access_details,
//           data.interaction_guests_details,
//           data.other_details,
//           function(err) {
//             if (err) {
//               console.log("error: " + err);
//             } else {
//               resolve();
//             }
//           }
//         );
//       }

//       console.log("batch done: count = " + count);
//     });

//     promise.then(function() {
//       var batchEnd = Date.now();
//       console.log((batchEnd - batchStart) / 1000);
//       wrapper();
//     });
//   };

//   wrapper();
// };

// outerWrapper();

// let seedDb = async () => {
//   let start = Date.now();

//   for (var i = 0; i < 1000; i++) {
//     let listingsBatch = [];

//     for (var j = 0; j < 100; j++) {
//       count += 1;
//       let data = new DataObj();

//       await db.insertAll(
//         data.name,
//         data.room_type,
//         data.room_type_details,
//         data.city,
//         data.city_details,
//         data.listing_details,
//         data.guest_access_details,
//         data.interaction_guests_details,
//         data.other_details,
//         function(err) {
//           if (err) {
//             console.log("error: " + err);
//           } else {
//             // resolve();
//           }
//         }
//       );
//     }
//   }
// };
