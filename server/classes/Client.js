const models = require("../database/models");
const {Op} = require("sequelize");
const Client = class {
	constructor(id, name, last_name, email, phone, active) {
		this.client_id = id
		this.client_name = name
		this.client_last_name = last_name
		this.client_email = email
		this.client_phone = phone
		this.client_active = active
	}
	
	create() {
		let me = this;
		return new Promise(function (resolve, reject) {
			models.client.create(me, {
				fields: ['client_name', 'client_last_name', 'client_email', 'client_phone', 'client_active'],
			}).then(results => {
				resolve(results)
			}).catch(error => {
				reject(error)
			})
		});
	}
	
	static update (data) {
		return new Promise(function (resolve, reject) {
			models.client.update(data , {
					fields: ['client_active', 'client_email', 'client_first_name', 'client_last_name', 'client_position'],
					where: {
						client_id: {
							[Op.eq]:  data.client_id
						}
					},
				})
				.then(results => {
					resolve(results)
				})
				.catch(error => {
					reject(error)
				})
		})
	}
	
	static delete (uid, verified) {
		return new Promise(function (resolve, reject) {
		
		});
	}
}

module.exports = Client
