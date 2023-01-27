const express = require('express');
const router = express.Router();
const userSchema = require('../schema/userSchema');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const { Error } = require('mongoose');

router.post('/', async (req, res) =>{
    const {
        uname,
        email,
        password
    } = req.body

    if(!uname || !email || !password){
        throw new Error('Enter Details...');
    }

    const isUserExist = await userSchema.findOne({email})

    if (isUserExist){
        res.status(401).end();
    } else{

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const saveUser = await userSchema.create({
        uname,
        email,
        password : hashedPassword
    });

    if(saveUser){
        res.json({
            _id : saveUser._id,
            uname : saveUser.uname,
            email : saveUser.email,
            token : generateToken(saveUser._id)
        });
    }

}
})

router.post('/login', async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new Error('Enter Details');
    } 

    const isUserExisted = await userSchema.findOne({email});

    if(!isUserExisted){
        res.status(401).end();
    }

    // console.log("User Existence : " + isUserExisted);
    // console.log("Comparing Password : " + bcrypt.compareSync(password, isUserExisted.password));

    if(isUserExisted && (await bcrypt.compareSync(password, isUserExisted.password)) ){
        console.log('Logged In...');
        res.json({
            _id : isUserExisted._id,
            uname : isUserExisted.uname,
            email : isUserExisted.email,
            token : generateToken(isUserExisted._id)
        });
    } else{
        res.status(401).end();;
        // throw new Error("Invalid Credentials...");
    }
})

router.post('/getme', protect, async (req, res) =>{
    const {_id, uname, email} = await userSchema.findById(req.user.id);

    res.json({
        id : _id,
        uname : uname,
        email : email
    })
})

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}


module.exports = router;