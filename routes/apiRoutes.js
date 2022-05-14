// Get public IP:
// $.getJSON("https:/.ipify.org?format=json", 
// function(data) { 
const { Users } = require('../models');
const router = require('express').Router();

// match /api/users/:ip
router
    .route('/user/:id')
    .get((req, res) => {
        Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => res.json(data))
        .catch(err=>{if(err) throw err});
    })
    .put((req,res)=>{
        Users.update(
            req.body,
            {where:{
                id:req.params.id
            }
        }).then(data=>res.json(data));
    })
    .delete((req, res) => {
        Users.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => res.json(data));
    });

// match /api/users
router.get('/user',(req,res)=>{
        Users.findAll()
        .then(data=>res.json(data))
        .catch(err=>{if(err)throw err});
    });

router.post('/user',(req,res)=>{
        Users.create(req.body)
        .then(data=>res.json(data))
        .catch(err=>{if(err)throw err});
    });

module.exports = router;
