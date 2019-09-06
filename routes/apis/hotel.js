const express = require('express');
const router = express.Router();
const Hotel = require('../../models/Hotel');

router.get('/', (req, res, next) => {
    Hotel.find()
    .then((posts) => {
        res.json(posts);
    }) 
    .catch(err => console.log(err))

});


    router.get('/single/:id', (req, res, next) => {
        //Grab the id of the bank account
        let id = req.params.id;
        Hotel.findById(id)
            .then((hotel) => {
                res.json(hotel);
            
            })
            .catch(err => console.log(err))
    });


    router.post('/add', (req, res, next) => {
        const first_name = req.body.first_name;
       const last_name = req.body.last_name;
       const sex = req.body.sex;
        const room_number = req.body.room_number;
        const room_type = req.body.room_type;
        const purpose_for_stay = req.body.purpose_for_stay;
        const final_bill = req.body.final_bill;
        newHotel = new Hotel({
            first_name: first_name,
           last_name: last_name,
           sex: sex,
            room_number: room_number,
            room_type: room_type,
            purpose_for_stay: purpose_for_stay,
            final_bill: final_bill

        });
       newHotel.save()
        .then(hotel => {
            res.json(hotel)
        })
        .catch(err => console.log(err));
        
    })

    router.put('/update/:id', (req, res, next) => {
        //get id of the account
        let id = req.params.id;
        //to find account by id
        Hotel.findById(id)
        .then(hotel => {
            hotel.check_in_time= req.body.check_in_time;
            hotel.check_out_time = req.body.check_out_time;
            hotel.final_bill = req.body.final_bill;
            
   
   
            hotel.save()
            .then(hotel =>{
               res.send({message: 'Account Updated Succesfully',
                status:'updated', 
                acount_details: hotel })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    });
   









    module.exports = router;



   
 