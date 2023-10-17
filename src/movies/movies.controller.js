const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");


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

function read(req, res) {
    const { movie: data } = res.locals;     
    res.json({ data });     
    }

function theaterList(req, res, next){
    moviesService
    .theatersPlayingMovie(req.params.movieId)
    .then((data) => res.json({data}))
    .catch(next);
}

function reviewsList(req, res, next){
  moviesService
  .movieReviewData(req.params.movieId)
  .then((data) => res.json({data}))
  .catch(next);
}

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