const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

//pulls a list of either all movies or just movies currently showing
//this changes depending on the req query (?is_showing=true)
function list(req, res, next) {
    const {is_showing}= req.query;
    console.log(is_showing)
    if(is_showing){
        moviesService
            .filteredList()
            .then((data) => res.json({ data }))
            .catch(next);
    }else{
        moviesService
            .list()
            .then((data) => res.json({ data }))
            .catch(next);
    }}

    //this will give back the data for movie passed through movieExists
function read(req, res) {
    const { movie: data } = res.locals;     
    res.json({ data });     
    }

    //this uses the service to pull the theater list
function theaterList(req, res, next){
    moviesService
    .theatersPlayingMovie(req.params.movieId)
    .then((data) => res.json({data}))
    .catch(next);
}

//this uses the service to pull all reviews for the movieId
function reviewsList(req, res, next){
  moviesService
  .movieReviewData(req.params.movieId)
  .then((data) => res.json({data}))
  .catch(next);
}

//middleware to check if the movieId matches something in the API
function movieExists(req, res, next) {
    moviesService  
      .read(req.params.movieId)  
      .then((movie) => {  
        if (movie) {  
          res.locals.movie = movie; 
          return next();  
        } 
        next({ status: 404, message: `Movie cannot be found.` });  
      })  
      .catch(next); 
  }


module.exports = {

  list,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  theaterList: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theaterList)],
  reviewsList: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviewsList)]
};