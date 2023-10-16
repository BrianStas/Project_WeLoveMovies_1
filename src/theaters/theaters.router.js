const router = require("express").Router();
const path = require("path");
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 

router
  .route("/:theater_id")
  .all(methodNotAllowed);

router 
  .route("/")
  .all(methodNotAllowed);

module.exports = router;