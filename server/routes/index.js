const express = require('express');
const router = express.Router();
const User = require('./User');
const Client = require('./Client');
const Service = require('./Service');
const Common = require('./Common');
const Note = require('./Note')

//user
router.post('/api/user/create', User.create);
router.post('/api/user/auth', User.auth);
router.post('/api/user/reAuth', User.reAuth);

//client
router.get('/api/client', Client.list)
router.get('/api/client/service', Client.clientAndService)
router.post('/api/client', Client.create)
router.put('/api/client', Client.update)
router.delete('/api/client', Client.delete)

//service
router.get('/api/notes-and-documents', Service.getNotesAndDocuments)
router.post('/api/service', Service.create)
router.put('/api/service', Service.update)
router.delete('/api/service', Service.delete)

//note
router.get('/api/note', Note.list)
router.post('/api/note', Note.create)
router.put('/api/note', Note.update)
router.delete('/api/note', Note.delete)

//common
router.get('/api/getById', Common.getById)

router.get('/api/query', Client.query)

//
router.get('/api/test-server', (req, res) => {
	res.status(200).send('Healthy!');
})

//test routes
const Test = require('./Test')
router.get('/api/test', Test.list)

module.exports = router;
