// Get public IP:
// $.getJSON("https:/.ipify.org?format=json", 
// function(data) { 

const router = require('express').Router();
const usersController = require('../controllers/usersController');

// match /api/users/:id
router
    .route('/user/:id')
    .get(usersController.findById)
    .delete(usersController.deleteUser);

// match /api/users
router
    .route('/user')
    .get(usersController.findAll)
    .post(usersController.saveUser);

module.exports = router;
