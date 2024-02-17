const Op = require('sequelize').Op
const convertOperatorToSequelize = (operator, value) => {

    let symbols = {
        '=': {[Op.eq]: value},
        'like': {[Op.like]: `%${value}%`},
        'LIKE': {[Op.like]: `%${value}%`},
        'contains':  {[Op.like]: `%${value}%`},
        'notLike': {[Op.notLike]: `%${value}%`},
        'NOTLIKE': {[Op.notLike]: `%${value}%`},
        '<': {[Op.lt]: value},
        '<=': {[Op.lte]: value},
        '>=': {[Op.gte]: value},
        '>': {[Op.gt]: value},
        '!=': {[Op.ne]: value},
        'in': {[Op.in]: value},
        'notin': {[Op.notIn]: value},
        'between': {[Op.between]: value}
    }

    return symbols[operator] || {};
}

module.exports = {
    react(cFilters) {
        let query = {
            where: {}
        };

        if (cFilters.filters) {
            let filters = JSON.parse(cFilters.filters)
            for (let filter of filters) {
                query.where[filter.columnField] = convertOperatorToSequelize(filter.operatorValue, filter.value)
            }
        }

        if (cFilters.offset) {
            query.offset = +cFilters.offset;
        }

        if (cFilters.limit) {
            query.limit = +cFilters.limit;
        }
        return query
    },
}
