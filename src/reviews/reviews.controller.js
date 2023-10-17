const { as } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");


function update(req, res, next){
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };  
      console.log(updatedReview)
      reviewsService    
        .update(updatedReview)    
        .then(() => 
        reviewsService
            .updateRead(res.locals.review.review_id)
            .then((data)=> {
            console.log("updatedRead data: ", data);
          return res.json({data})}))
        .catch(next);
}

function destroy(req, res, next) {
    reviewsService 
      .delete(res.locals.review.review_id)  
      .then(() => res.sendStatus(204))  
      .catch(next);  
  }

  function reviewExists(req, res, next) {
    reviewsService  
      .read(req.params.reviewId)  
      .then((review) => {  
        if (review) {  
          res.locals.review = review; 
          return next();  
        } 
        next({ status: 404, message: `Review cannot be found.` });  
      })  
      .catch(next); 
  }

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
  };