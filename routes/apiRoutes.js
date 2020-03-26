// Get public IP:
// $.getJSON("https://api.ipify.org?format=json", 
// function(data) { 

const router = require('express').Router();
const usersController = require('../controllers/usersController');

// match /api/users/:id
// router
// .route('/api/user/:id')
// .get(usersController.findById)
// .delete(usersController.deleteBook);

// match /api/users
router
    .route('/api/user')
    .get(usersController.findAll)
    .post(usersController.saveBook);

module.exports = router;
