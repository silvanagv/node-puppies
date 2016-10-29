DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO pups (name, breed, age, sex) VALUES ('Tyler', 'GSD', 3, 'F');

CREATE TABLE mountains (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  elevation INTEGER,
  prominence INTEGER,
  range VARCHAR,
  country VARCHAR
);

INSERT INTO mountains (name, elevation, prominence, range, country) VALUES ('K2', 8614, 4020, 'Karakoram', 'Pakistan/China')
