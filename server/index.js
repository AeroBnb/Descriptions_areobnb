var express = require("express");
var bodyParser = require("body-parser");
var db = require("../database-mysql");
var path = require("path");
var model = require("./models/mysqlModel.js");

var app = express();
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(bodyParser.json());

app.listen(4000, function() {
  console.log(`listening on port ${process.env.PORT || 4000}`);
});

//process.env.PORT ||

app.get("/listings", function(req, res) {
  // console.log("in get listing route");
  // console.log(model.getListing);
  model.getListing(req.query.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var listing = JSON.parse(JSON.stringify(data));
      res.send(listing);
    }
  });
  // .then((results) => {
  //   var listing = JSON.parse(JSON.stringify(results));
  //   res.send(listing);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).send();
  // });
});

app.post("/listings", function(req, res) {
  data = {
    user_name: req.query.user_name,
    room_type: req.query.room_type,
    room_type_details: req.query.room_type_details,
    city: req.query.city,
    city_details: req.query.city_details,
    listing_details: req.query.listing_details,
    guest_access_details: req.query.guest_access_details,
    interaction_guests_details: req.query.interaction_guests_details,
    other_details: req.query.other_details
  };
  console.log(data);
  model.addListing(data, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
  // .then()
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).send();
  // });
});

app.delete("/listings", function(req, res) {
  model.deleteListing(req.query.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
  // .then()
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).send();
  // });
});

app.put("/listings", function(req, res) {
  // console.log("in put route, logging data");

  data = {
    id: req.query.id,
    user_name: req.query.user_name,
    room_type: req.query.room_type,
    room_type_details: req.query.room_type_details,
    city: req.query.city,
    city_details: req.query.city_details,
    listing_details: req.query.listing_details,
    guest_access_details: req.query.guest_access_details,
    interaction_guests_details: req.query.interaction_guests_details,
    other_details: req.query.other_details
  };

  // console.log(data);
  model.updateListing(data, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
  // .then()
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).send();
  // });
});

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
});
