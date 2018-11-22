const db = require("../../database-mysql/index.js");

const getListing = (id, callback) => {
  // console.log("in getListing");
  // console.log(db);
  db.connection.query(
    `
    SELECT * FROM listings
    WHERE id = ?
  `,
    [id],
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    }
  );
};

const addListing = (data, callback) => {
  console.log("were in the model");
  console.log(data);
  db.connection.query(
    `
    INSERT INTO listings (user_name, room_type, room_type_details, city, city_details, listing_details, guest_access_details, interaction_guests_details, other_details)
    VALUES (?,?,?,?,?,?,?,?,?)
  `,
    [
      data.user_name,
      data.room_type,
      data.room_type_details,
      data.city,
      data.city_details,
      data.listing_details,
      data.guest_access_details,
      data.interaction_guests_details,
      data.other_details
    ],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    }
  );
  // knex("listings").insert(data);
};

const deleteListing = (id, callback) => {
  db.connection.query(
    `
  DELETE FROM listings 
  WHERE id = ?
  `,
    [id],
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    }
  );
};

const updateListing = (data, callback) => {
  console.log("in update model, logging data");
  console.log(data);
  db.connection.query(
    `
    UPDATE listings SET room_type = ${data.room_type}, user_name = ${
      data.user_name
    }
    , room_type_details = ${data.room_type_details}, city = ${
      data.city
    }, city_details = ${data.city_details}, listing_details = ${
      data.listing_details
    }, guest_access_details = ${
      data.guest_access_details
    }, interaction_guests_details = ${
      data.interaction_guests_details
    }, other_details = ${data.other_details}
    WHERE id = ${data.id}
  `,

    (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    }
  );
};

module.exports.getListing = getListing;
module.exports.addListing = addListing;
module.exports.deleteListing = deleteListing;
module.exports.updateListing = updateListing;
