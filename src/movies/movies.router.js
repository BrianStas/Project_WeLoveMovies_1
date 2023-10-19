const router = require("express").Router();
const path = require("path");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 

//only acceptable method is GET for all movie routes

//get all reviews for a particular movie
router
  .route("/:movieId/reviews")
  .get(controller.reviewsList)
  .all(methodNotAllowed);

  //get all theaters playing a particular movie
router
    .route("/:movieId/theaters")
    .get(controller.theaterList)
    .all(methodNotAllowed);

    //get info for a particular movie
router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

  //list all movies
router 
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;