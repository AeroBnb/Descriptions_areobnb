const faker = require("faker");
var db = require("../database-mysql/index.js");

function dataGenerator() {
  var name = faker.fake("{{name.firstName}} {{name.lastName}}");
  var rooms = [
    "ENTIRE APARTMENT",
    "ENTIRE LOFT",
    "PRIVATE ROOM IN TOWNHOUSE",
    "PRIVATE ROOM IN APARTMENT",
    "PRIVATE ROOM",
    "PRIVATE ROOM IN GUEST SUITE"
  ];
  var room_type = rooms[Math.floor(Math.random() * rooms.length)];
  var room_type_details = faker.fake("{{lorem.words}} {{lorem.words}}");
  var city = faker.address.city();
  var city_details = faker.lorem.sentence();
  var listing_details = faker.lorem.paragraph();
  var guest_access_details = faker.lorem.sentence();
  var interaction_guests_details = faker.lorem.sentence();
  var other_details = faker.lorem.sentence();

  var ID = 1;

  for (var i = 0; i < 300000; i++) {
    db.insertAll(
      ID,
      name,
      room_type,
      room_type_details,
      city,
      city_details,
      listing_details,
      guest_access_details,
      interaction_guests_details,
      other_details,
      function(err, result) {
        if (err) {
          console.log("error: " + err);
        } else {
          // console.log("success");
        }
      }
    );
    ID++;
  }

  console.log("done");
}

dataGenerator();
