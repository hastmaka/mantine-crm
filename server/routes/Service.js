const models = require('../database/models');
const {handleError, handleDataToReturn} = require ("../helper");
const {Op} = require ("sequelize");
const Service = {
	create: (req, res) => {
		//client_client_id, service_status, service_note, service_document, service_bath, service_bed, service_zip, service_pre_approval, service_type, service_from, service_to, service_pet
		let query = {
			offset: +req.query.offset,
			limit: +req.query.limit,
			order: [['client_name', 'ASC'], ['client_id', 'ASC']],
			where: {client_active: true}
		}

		function filterUndefined(obj) {
			return Object.fromEntries(
				Object.entries(obj).filter(([key, value]) => ![undefined, null].includes(value))
			);
		}

		const sanitizeFields = filterUndefined(req.body)
		sanitizeFields.service_active = true
		// debugger
		models.service.create(sanitizeFields).then(async service => {
			await service.reload();
			res.json(handleDataToReturn(service))
		}).catch(error => {
			handleError(res, error)
		})
	},
	update: (req, res) => {
		models.service.update(req.body, {
			where: {
				service_id: {
					[Op.eq]: +req.query.id
				}
			}
		}).then(() => {
			models.service.findByPk(+req.query.id).then(service => {
				res.json(handleDataToReturn(service))
			}).catch(error => {
				handleError(res, error)
			})
		}).catch(error => {
			handleError(res, error)
		})
	},
	delete: (req, res) => {
		models.service.update({
			service_active: false
		}, {
			where: {
				service_id: {
					[Op.eq]:  req.body.id
				}
			},
		}).then(() => {
			models.client.findByPk(req.query.client_id, {
				include: {
					model: models.service,
					where: {service_active: true}
				},
				required: false
			}).then(clientWithService => {
				let services = clientWithService?.dataValues?.services || []
				res.json(handleDataToReturn(services))
			}).catch(error => {
				handleError(res, error)
			})
		}).catch(error => {
			handleError(res, error)
		})
	},
	getAll: (req, res) => {},
	getNotesAndDocuments: async (req, res) => {
		await Promise.all([
			models.note.findAll({
				where: {
					service_service_id: {
						[Op.eq]: +req.query.id
					},
					note_active: true,
				},
				required: false
			}),
			models.document.findAll({
				where: {
					service_service_id: {
						[Op.eq]: +req.query.id
					},
					document_active: true,
				},
				required: false,
			}),
		]).then(([notes, documents]) => {
			res.json(handleDataToReturn({notes, documents}))
		}).catch(error => {
			handleError(res, error)
		})
	}
}

module.exports = Service;
