var mysql = require("mysql");

// var password = require("../config.js").amazonPassword;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "running1",
  database: "listings"
});

var selectAll = function(id, callback) {
  var sql = "SELECT * FROM listing_description WHERE unique_ID=(?)";
  connection.query(sql, [id], function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insertAll = function(
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
  callback
) {
  // console.log(arguments);

  var sql =
    "INSERT INTO listing_description (unique_ID, user_name, room_type, room_type_details, city, city_details, listing_details, guest_access_details, interaction_guests_details, other_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [
      ID,
      name,
      room_type,
      room_type_details,
      city,
      city_details,
      listing_details,
      guest_access_details,
      interaction_guests_details,
      other_details
    ],
    function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports.selectAll = selectAll;
module.exports.insertAll = insertAll;
// module.exports.connection = connection;
