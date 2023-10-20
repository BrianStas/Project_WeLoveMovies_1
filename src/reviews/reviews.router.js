const router = require("express").Router();
const path = require("path");
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 

//for a review ID, we can update or delete. 
//the assignment did not require any method to add a new review
//if so, that would be a post method under the "/" route
router
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router 
  .route("/")
  .all(methodNotAllowed);

module.exports = router;