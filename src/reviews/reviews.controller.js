const { as } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");


// this function first sends off data to update and then calls
//updateRead to return all information for the updated review
//if you don't have that read portion, nothing will be returned
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

// simple call to delete a particular review via the Review ID
function destroy(req, res, next) {
    reviewsService 
      .delete(res.locals.review.review_id)  
      .then(() => res.sendStatus(204))  
      .catch(next);  
  }

// checker for if a review exists
//pulls the review ID from params, checks if that's in the reviews and returns error if not
//if successful, sets the locals.review to equal the found review data
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