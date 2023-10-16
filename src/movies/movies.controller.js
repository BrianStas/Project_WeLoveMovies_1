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
  read: [movieExists, read]

};