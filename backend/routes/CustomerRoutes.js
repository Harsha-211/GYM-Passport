const express = require('express')
const router = express.Router();
const {Op} = require('sequelize');
const Gym = require('../models/Gym');
const User = require('../models/User');

 // Gym search and filter End point
 // Get /api/customer/search
router.get('/search',async (req,res)=>{
    try{
        const {gym_name,city} = req.query;
        let searchConditions = {};
        if(gym_name){
            searchConditions.gym_name = { [Op.like]: `%${gym_name}%`};
        }
        if(city){
            searchConditions.city = city;
        }

        let orderLogic = [];
        if(city&&!gym_name){
            orderLogic = [['rating','DESC']];
        }

        const gyms = await Gym.findAll({
            where: searchConditions,
            order: orderLogic
        });
        return res.status(200).json({success:true,count:gyms.length, data:gyms});
    }catch(error){
        console.error("Error searching gyms:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
});

//Fetch User Profile & Wallet Balance
//GET /api/customer/profile/:id

router.get('/profile/:id',async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ success:false, message:"User not found"});
        }
        return res.status(200).json({success:true,data:user});
    }catch(error){
        console.error("Error Fetching user profile:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
});


//Add Money to Wallet
//Post /api/customer/wallet/topup

router.post('/wallet/topup',async(req,res)=>{
    try{
        const {user_id, amount } = req.body;

        if(!user_id ||!amount || amount<=0){
            return res.status(400).json({success:false, message:"Invalid Input data"});
        }
        const user = await User.findByPk(user_id);
        if(!user){
            return res.status(404).json({success:false, message:"user not found"});
        }
        user.wallet_balance += parseInt(amount);
        await user.save();

        return res.status(200).json({
            success: true,
            message: `Successfully added ${amount} credits!`,
            new_balance: user.wallet_balance
        });
    }catch(error){
        console.error("Error updating wallet balance:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
});

module.exports = router