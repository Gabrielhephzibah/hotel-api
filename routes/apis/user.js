const express = require('express');
const dotenv = require("dotenv");
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

router.get('/', (req, res, next) => {
    User.find()
    .then((user) => {
        res.json(user);
    })
    .catch(err => console.log(err))
});

router.post('/signup',(req, res, next) => {
    User.find({ name: req.body.name })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message:'Name already exist'
            });
        } else{
            
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                password: hash
            });
             user
             .save()
             .then(result => {
                 console.log(result);
                 res.status(201).json({
                     message: ' signup successfull',
            
                 });

             })
             .catch(err =>{
                 console.log(err);
                 res.status(500).json({
                     error: err
                 });
             });
        }
    });
        }
    })
    
    
});



// router.post("/login", (req, res, next) => {
//     console.log(req.body)
//     User.find({ name: req.body.name })
//     .exec()
//     .then(user => {
//         console.log(user)
//         if (user.length < 1) {
//             return res.status(401).json({
//                 message: 'Auth failed'
//             });
//         }
//         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//             if (err) {
//                 return res.status(401).json({
//                     message: 'Auth failed'
//                 });
//             }
//             if (result) {
//                 const token = jwt.sign({
//                     name: user[0].name,
//                     userId: user[0]._id
//                 }, process.env.JWT_KEY, {
//                     expiresIn: "24hrs"
//                 });
//                 return res.status(200).json({
//                     message: 'Auth successful',
//                     token: token
//                 });
//             }
//             res.status(401).json({
//                 message: 'Auth failed'
//             });
//         });
//     })
//     .catch(err => console.log(err));
// });

router.post("/login", (req, res, next) => {
    console.log(req.body)
    User.find({name: req.body.name})
    .exec()
    .then(user => {
        console.log(user)
        if (user.length < 1 ){
            return res.status(404).json({
                message: 'Verification Failed, pls enter correct name and password'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if  (err){
                return res.status(404).json({
                    message: 'Verification Failed, pls enter correct name and password'
                });
            }
            if (result) {
                const token = jwt.sign(
                {
                    name: user[0].name,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY,  
                {
                    expiresIn: "5 days"
                }
                );
                return res.status(200).json({
                    message: 'Login successfull',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Verification failed, pls enter correct name or password'
            });
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    

});

router.delete('/:userId', (req, res, next) =>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;