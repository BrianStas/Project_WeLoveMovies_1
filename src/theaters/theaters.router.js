const router = require("express").Router();
const path = require("path");
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed"); 

router
  .route("/:dishId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router 
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;