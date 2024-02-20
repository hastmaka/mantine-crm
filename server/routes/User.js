const Op = require('sequelize').Op;
const models = require('../database/models');
const {handleDataToReturn, handleError} = require("../helper");
const {createUser, verifyIdToken, getUserById} = require ("../helper/firebase/Firebase");

const user = {
    create: async (req, res) => {debugger
        if (!req.body || Object.keys(req.body).length === 0) {
            return handleError(res, 'Missing Argument')
        }
        const {name, last_name, email, password} = req.body;
        const firebaseUser = await createUser(`${name} ${last_name}`, email, password)

        if(firebaseUser === 'error') {
            return handleError(res, 'Firebase Error')
        } else {
            models.user.create({
                user_name: name,
                user_last_name: last_name,
                user_email: email,
                user_uid: firebaseUser.uid,
                user_active: true
            }).then((data) => {
                const {user_password, created_at, ...rest} = data.dataValues
                res.json(handleDataToReturn(rest))
            }).catch(error => {
                handleError(res, error)
            })
        }
    },
    auth: async (req, res) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return handleError(res, 'Missing Argument')
        }
        const authenticatedUser = await verifyIdToken(req.body.token)
        if(authenticatedUser === 'error') {
            return handleError(res, 'Token is not valid')
        } else {
            models.user.findOne({
                where: {
                    user_uid: {
                        [Op.eq]: authenticatedUser.uid
                    }
                }
            }).then(user => {
                if(!user) {
                    return handleError(res, 'User is not in DB', 500)
                }
                if(user.get('user_active')) {
                    res.json(handleDataToReturn(user))
                } else {
                    return handleError(res, 'User is not active, Contact Admin', 403)
                }
            }).catch(err => {
                handleError(res,'Internal error accessing DB')
            })
        }
    },
    reAuth: async (req, res) => {debugger
        const user = getUserById(req.body.uid)
        debugger
    }
}

module.exports = user;
