const express = require('express');
const router = express.Router();


// User Model
const User = require('../models/users.model.js');


router.post('/signin', (req, res) => {
  User.findOne({username:req.body.username})
    .then(users =>res.json({message:(users.password==req.body.password)?1:0}))
    .catch(err=>res.json({message:-1}))
});

router.post('/signup', (req, res) => {
    const newUser=new User({
        name:req.body.name,
        username:req.body.username,
        mobilenumber:req.body.mobilenumber,
        password:req.body.password,
    })
    newUser.save()
        .then(user=>res.json({message:1}))
        .catch(res1=>res.json({message:0}))
});

router.post('/details', (req, res) => {
  if(!req.body.username) return res.status(401).json({msg:"error"})
  User.findOne({username:req.body.username})
    .then(users => res.json(users))
    .catch(err=>res.json())
    })

module.exports=router;

