const router = require('express').Router(); 
const Farmer = require('../model/farmer');

router.post('/register' , async(req ,res) => {
    const farmer = new Farmer ({
        name : req.body.name,
        email : req.body.email,
        username:req.body.username,
        password : req.body.password
    });
    try{
        const savedUser = await farmer.save()
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err)
    }
})
module.exports= router ; 
