const router = require("express").Router();
const path = require("path");
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 

router
  .route("/:review_id")
  .all(methodNotAllowed);

router 
  .route("/")
  .all(methodNotAllowed);

module.exports = router;