CREATE SCHEMA myschema;

DROP DATABASE IF EXISTS myschema.listings;

CREATE DATABASE myschema.listings;

\C listings;



DROP TABLE IF EXISTS myschema.listings;

CREATE TABLE myschema.listings (
	id INT NOT NULL PRIMARY KEY,
	room_type varchar(500),
	user_name varchar(500),
	room_type_details varchar(500),
	city varchar(500),
	city_details varchar(500),
	listing_details varchar(500),
	guest_access_details varchar(500),
	interaction_guests_details varchar(500),
	other_details varchar(500)
);