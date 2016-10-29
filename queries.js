var promise = require('bluebird')

var options = {
  promiseLib: promise
}

var pgp = require('pg-promise')(options)
var connectionString = 'postgres://localhost:5432/puppies'
var db = pgp(connectionString)

function getAllPuppies(req, res, next) {
  db.any('select * from pups')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL puppies'
    })
  })
  .catch(function(err){
    return next(err)
  })
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from pups where id = $1', pupID)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE puppy'
    })
  })
  .catch(function(err){
    return next(err)
  })
}

function createPuppy(req, res, next){
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' + 'values(${name}, ${breed}, ${age}, ${sex})',
  req.body)
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one puppy'
    })
  })
  .catch(function(err){
    return next(err)
  })
}


function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllMountains(req, res, next) {
  db.any('select * from mountains')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL mountains'
    })
  })
  .catch(function(err){
    return next(err)
  })
}

function getSingleMountain(req, res, next) {
  var mountainID = parseInt(req.params.id);
  db.one('select * from mountains where id = $1', mountainID)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE mountains'
    })
  })
  .catch(function(err){
    return next(err)
  })
}

function createMountain(req, res, next){
  req.body.elevation = parseInt(req.body.elevation);
  req.body.prominence = parseInt(req.body.prominence);

  db.none('insert into mountains(name, elevation, prominence, range, country)' + 'values(${name}, ${elevation}, ${prominence}, ${range}, ${country})',
  req.body)
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one mountain'
    })
  })
  .catch(function(err){
    return next(err)
  })
}


function updateMountain(req, res, next) {
  db.none('update mountains set name=$1, elevation=$2, prominence=$3, range=$4, country=$5 where id=$6',
    [req.body.name, parseInt(req.body.elevation), parseInt(req.body.prominence),
      req.body.range, req.body.country, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated mountain'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeMountain(req, res, next) {
  var mountainID = parseInt(req.params.id);
  db.result('delete from mountains where id = $1', mountainID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} mountain`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy,
  getAllMountains: getAllMountains,
  getSingleMountain: getSingleMountain,
  createMountain: createMountain,
  updateMountain: updateMountain,
  removeMountain: removeMountain
}
