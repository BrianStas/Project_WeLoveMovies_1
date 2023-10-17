const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();    
  }

  const addCritic = mapProperties({   
        critic_critic_id: "critic.critic_id",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
        critic_created_at: "critic.created_at",
        critic_updated_at: "critic.updated_at"      
  })

  function update(updatedReview){
    return knex("reviews")     
      .select("*")
      .where({ review_id: updatedReview.review_id})
      .update(updatedReview, "*")
  }

function updateRead(reviewId){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("c.*","c.critic_id as critic_critic_id", "c.created_at as critic_created_at", "c.updated_at as critic_updated_at", "r.*")
    .where({"r.review_id": reviewId})
    .first()
    .then(addCritic)
}

function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

module.exports = {
    read,
    delete: destroy,
    update,
    updateRead
  };