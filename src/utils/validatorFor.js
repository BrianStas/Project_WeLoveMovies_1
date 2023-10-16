function validatorFor(property) {
    return function (req, res, next) {
      if (req.body.data[property]) {
        next();
      } else {
        next({
          status: 400,
          message: `request body must include ${property}`
        });
      }
    }
  }
  
  module.exports = validatorFor;