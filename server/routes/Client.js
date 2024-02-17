const models = require('../database/models');
const {handleError, handleDataToReturn} = require ("../helper");
const {Op} = require ("sequelize");
module.exports = {
	create: (req, res) => {
		let query = {
			offset: +req.query.offset,
			limit: +req.query.limit,
			order: [['created_at', 'DESC']],
			where: {client_active: true}
		}

		models.client.create({
			...req.body,
			client_active: true
		}).then(() => {
			models.client.findAndCountAll(query).then(client => {
				res.json(handleDataToReturn(client))
			}).catch(error => {
				handleError(res, error)
			})
		}).catch(error => {
			handleError(res, error)
		})
	},
	update: (req, res) => {debugger
		models.client.update(req.body, {
			where: {
				client_id: {
					[Op.eq]: +req.query.id
				}
			}
		}).then(() => {
			models.client.findByPk(+req.query.id).then(client => {
				res.json(handleDataToReturn(client))
			}).catch(error => {
				handleError(res, error)
			})
		}).catch(error => {
			handleError(res, error)
		})
	},
	delete: (req, res) => {
		let query = {
			offset: +req.query.offset,
			limit: +req.query.limit,
			order: [['created_at', 'DESC']],
			where: {client_active: true}
		}

		models.client.update({
			client_active: false
		}, {
			where: {
				client_id: {
					[Op.eq]:  req.body.id
				}
			},
		}).then(() => {
			models.client.findAndCountAll(query).then(client => {
				res.json(handleDataToReturn(client))
			}).catch(error => {
				handleError(res, error)
			})
		}).catch(error => {
			handleError(res, error)
		})
	},
	list: (req, res) => {
		if (!req.query || Object.keys(req.query).length === 0) {
			return handleError(res, 'Missing Argument')
		}

		let {offset, limit, filters} = req.query,
			query = {
				offset: +offset,
				limit: +limit,
				order: [['created_at', 'DESC']],
				where: {client_active: true}
			};

		if(filters) {
			let f = JSON.parse(filters)
			query.where = {
				...query.where,
				[Op.or]: Object.entries(f).map(([key, value]) => ({
					[value.columnField]: { [Op.startsWith]: value.value }
				}))
			}
		}

		models.client.findAndCountAll(query).then(client => {
			res.json(handleDataToReturn(client))
		}).catch(error => {debugger
			handleError(res, error)
		})
	},
	clientAndService: (req, res) => {
		models.client.findByPk(req.query.id, {
			include: {
				model: models.service,
				where: {service_active: true},
				required: false,
			}
		}).then(clientWithService => {
			res.json(handleDataToReturn(clientWithService))
		}).catch(error => {
			handleError(res, error)
		})
	},

	query: () => {
		models.client.findAll({
			offset: 0,
			limit: 10,
			where: {
				client_active: true,
				[Op.or]: [
					// { client_name: { [Op.startsWith]: '%corr%' } },
					{ client_last_name: { [Op.startsWith]: 'ut' } },
					// { client_phone: { [Op.like]: '%corr%' } },
				],
			},
			order: [['client_name', 'ASC'], ['client_id', 'ASC']],
		}).then(results => {
			debugger
			console.log(results);
		}).catch(error => {
			debugger
			console.error('Error:', error);
		});
	}
}
