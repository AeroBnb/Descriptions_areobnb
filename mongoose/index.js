const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/test",
  { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {});

var listingSchema = new mongoose.Schema({
  id: Number,
  name: String,
  roomType: String,
  roomDetails: String,
  city: String,
  cityDetails: String,
  listingDetails: String,
  guestAccess: String,
  interactionDetails: String,
  other: String
});

var Listing = mongoose.model("Listing", listingSchema);

const faker = require("faker");

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

// function fillDatabase() {
//   for (var i = 1; i < 100000; i++) {
//     var listing = new Listing({
//       id: count,
//       name: namesArr[Math.floor(Math.random() * namesArr.length)],
//       roomType: roomsArr[Math.floor(Math.random() * roomsArr.length)],
//       roomDetails:
//         roomDetailsArr[Math.floor(Math.random() * roomDetailsArr.length)],
//       city: citiesArr[Math.floor(Math.random() * citiesArr.length)],
//       cityDetails:
//         sentencesArr[Math.floor(Math.random() * sentencesArr.length)],
//       listingDetails:
//         paragraphsArr[Math.floor(Math.random() * paragraphsArr.length)],
//       guestAccess:
//         sentencesArr[Math.floor(Math.random() * sentencesArr.length)],
//       interactionDetails:
//         sentencesArr[Math.floor(Math.random() * sentencesArr.length)],
//       other: sentencesArr[Math.floor(Math.random() * sentencesArr.length)]
//     });

//     listing.save(function(err, apt1) {
//       if (err) return console.log(err);
//     });

//     count += 1;
//     console.log(count);
//   }
// }

// fillDatabase();

// fs.appendFile();

var size = 10000000;
var count = 1;

var outerWrapper = () => {
  let start = Date.now();
  console.log("start time: " + start / 1000);

  var wrapper = () => {
    if (count >= size) {
      console.log("done");
      var end = Date.now();
      console.log("ending at: " + end / 1000);
      console.log("total time in minutes: " + (end - start) / 1000 / 60);
      return;
    }

    var batchStart;
    var promise = new Promise(function(resolve) {
      batchStart = Date.now();
      var listings = [];

      for (var i = 0; i < 20000; i++) {
        var listing = new Listing({
          id: count,
          name: namesArr[Math.floor(Math.random() * namesArr.length)],
          roomType: roomsArr[Math.floor(Math.random() * roomsArr.length)],
          roomDetails:
            roomDetailsArr[Math.floor(Math.random() * roomDetailsArr.length)],
          city: citiesArr[Math.floor(Math.random() * citiesArr.length)],
          cityDetails:
            sentencesArr[Math.floor(Math.random() * sentencesArr.length)],
          listingDetails:
            paragraphsArr[Math.floor(Math.random() * paragraphsArr.length)],
          guestAccess:
            sentencesArr[Math.floor(Math.random() * sentencesArr.length)],
          interactionDetails:
            sentencesArr[Math.floor(Math.random() * sentencesArr.length)],
          other: sentencesArr[Math.floor(Math.random() * sentencesArr.length)]
        });

        listings.push(listing);

        count += 1;
      }

      listing.collection.insert(listings, function(err) {
        if (err) {
          console.log("error");
        } else {
          resolve();
        }
      });
    });

    promise.then(function() {
      var batchEnd = Date.now();
      // console.log((batchEnd - batchStart) / 1000);
      wrapper();
    });
  };

  wrapper();
};

outerWrapper();
