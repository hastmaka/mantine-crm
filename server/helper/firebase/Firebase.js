const firebase = require('firebase-admin');

const serviceAccount = require('../firebase/ez-manage-realtor-firebase-adminsdk-fkujg-c58992a0ca.json');
firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount)
});

console.log('firebase initialized');

module.exports = {
	getUserById: function (uid) {
		return new Promise(function (resolve, reject) {
			firebase.auth().getUser(uid)
				.then(function (user) {debugger
					resolve(user);
				})
				.catch(function (error) {
					reject(error)
				})
		});
	},

	getUserByEmail: function (email) {
		return new Promise(function (resolve, reject) {
			firebase.auth().getUserByEmail(email)
				.then(function (user) {
					resolve(user);
				})
				.catch(function (error) {
					if(error.errorInfo.code === 'auth/user-not-found') {
						resolve(null);
					} else {
						reject(error);
					}

				})
		});
	},

	createUser: function (fullName, email, password) {
		return new Promise(function (resolve, reject) {
			firebase.auth().createUser({
					email: email,
					emailVerified: false,
					password: password,
					displayName: fullName,
					disabled: false
				}).then(function(userRecord) {
					resolve(userRecord);
					console.log('Successfully created new user:', userRecord.uid);
				}).catch(function(error) {
					resolve('error');
					console.log('Error creating new user:', error);
				});
		})
	},

	updateUserVerifiedEmail: function (uid, verified) {
		return new Promise(function (resolve, reject) {
			firebase.auth().updateUser(uid, {
					emailVerified: verified
				})
				.then(function() {
					resolve();
				})
				.catch(function(error) {
					reject(error)
				});
		});
	},

	updateUserEmail: function (uid, email) {
		firebase.auth().updateUser(uid, {
				email: email
			})
			.then(function(userRecord) {
				console.log('email updated successfully')
			})
			.catch(function(error) {
				console.log(error)
			});
	},

	updateUserDisabledStatus: function (uid, disabled) {
		firebase.auth().updateUser(uid, {
				disabled: disabled
			})
			.then(function(userRecord) {
				console.log('email updated successfully')
			})
			.catch(function(error) {
				console.log(error)
			});
	},

	verifyIdToken: function (idToken) {
		return new Promise(function (resolve, reject) {
			firebase.auth().verifyIdToken(idToken)
				.then(function(decodedToken) {
					resolve(decodedToken);
				})
				.catch(function(error) {
					resolve('error');
				});
		});

	}
}
