const models = require("../database/models");
const {Op} = require("sequelize");
const User = class {
	constructor(id, name, last_name, email, password, active) {
		this.user_id = id
		this.user_name = name
		this.user_last_name = last_name
		this.user_email = email
		this.user_password = password
		this.user_active = active
	}
	
	create() {
		let me = this;
		return new Promise((resolve, reject) => {
			models.user.create(me, {
				fields: ['user_name', 'user_last_name', 'user_email', 'user_password', 'user_active'],
			}).then(results => {
				resolve(results)
			}).catch(error => {
				reject(error)
			})
		});
	}
	
	static update (data) {
		return new Promise(function (resolve, reject) {
			models.user.update(data , {
					fields: ['user_active', 'user_email', 'user_first_name', 'user_last_name', 'user_position'],
					where: {
						user_id: {
							[Op.eq]:  data.user_id
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

module.exports = User
