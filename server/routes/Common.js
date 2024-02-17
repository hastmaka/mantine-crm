const models = require("../database/models");
const {handleDataToReturn, handleError} = require("../helper");
module.exports = {
    getById: (req, res) => {
        let {target, id} = req.query
        models[target].findByPk(id).then(data => {
            res.json(handleDataToReturn(data))
        }).catch(error => {
            handleError(res, error)
        })
    },
}
