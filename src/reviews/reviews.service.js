const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// simple delete function that matches review ID to param for deletion
function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();    
  }

  // specialty function that helps map a nested object in the return for a review.
  //here, the critic fields will be nested in the review fields under the property "critic"
  const addCritic = mapProperties({   
        critic_critic_id: "critic.critic_id",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
        critic_created_at: "critic.created_at",
        critic_updated_at: "critic.updated_at"      
  })

 // this is the update function, but nothing will be returned, so need to call updateRead as well
  function update(updatedReview){
    return knex("reviews")     
      .select("*")
      .where({ review_id: updatedReview.review_id})
      .update(updatedReview, "*")
  }

// this runs after the update to return the correct review information
// note: it will return all review and critic fields, but then the critic gets mapped to a nested object
function updateRead(reviewId){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("c.*","c.critic_id as critic_critic_id", "c.created_at as critic_created_at", "c.updated_at as critic_updated_at", "r.*")
    .where({"r.review_id": reviewId})
    .first()
    .then(addCritic)
}

// simple read function to return information on the given review ID
function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

module.exports = {
    read,
    delete: destroy,
    update,
    updateRead
  };