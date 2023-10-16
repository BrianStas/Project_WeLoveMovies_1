const knex = require("../db/connection");


function list() {
  return knex("movies").select("*");
}

function filteredList(){
    console.log("filteredList working")
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true})
}

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {

  list,
  filteredList

};