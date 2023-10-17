const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const theatersService = require("./theaters.service");

function list(req, res, next){
    theatersService
    .list()
    .then((data) => {
        console.log("this is theater list: ", data)
        return res.json({ data })})
    .catch(next);
}

module.exports = {
    list
}