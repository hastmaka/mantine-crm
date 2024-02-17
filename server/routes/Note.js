const models = require('../database/models');
const {handleError, handleDataToReturn} = require ("../helper");
const {Op} = require ("sequelize");
const Service = {
    create: (req, res) => {
        models.note.create({
            ...req.body,
            note_active: true,
            service_service_id: +req.query.id
        }).then(note => {
            res.json(handleDataToReturn(note))
        }).catch(error => {
            handleError(res, error)
        })
    },
    update: (req, res) => {
        models.note.update(req.body, {
            where: {
                note_id: {
                    [Op.eq]:  +req.query.id
                }
            },
            individualHooks: true
        }).then(([noteUpdated, [updated]]) => {
            res.json(handleDataToReturn(updated))
        }).catch(error => {
            handleError(res, error)
        })
    },
    delete: (req, res) => {
        models.note.update({
            note_active: false
        }, {
            where: {
                note_id: {
                    [Op.eq]:  +req.body.id
                }
            },
        }).then(() => {
            models.note.findAll({
                where: {
                    service_service_id: {
                        [Op.eq]: +req.query.id
                    },
                    note_active: true,
                },
                order: [['created_at', 'DESC']],
                required: false
            }).then(notes => {
                res.json(handleDataToReturn(notes))
            }).catch(error => {
                handleError(res, error)
            })
        }).catch(error => {
            handleError(res, error)
        })
    },
    list: (req, res) => {
        debugger
    },
}

module.exports = Service;
