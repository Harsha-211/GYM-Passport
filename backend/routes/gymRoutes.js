const express = require('express');
const router = express.Router();
const sequeslize = require('../database');

const User = require('../models/User');
const Gym = require('../models/Gym');
const Attendance = require('../models/Attendance');
const Transaction = require('../models/Transaction');

// GYM counter QR Check-in handshake 
// Post /api/gym/checkin

router.post('/checkin',async (req,res)=>{
    const t = await sequeslize.transaction();
    try{
        const { user_id, gym_id } = req.body;

        if(!user_id || !gym_id){
            return res.status(400).json({success:false, message:"Missing User ID or Gym ID"});
        }

        // Fetch the user and gym records inside the transaction
        const user = await User.findByPk(user_id, {transaction: t });
        const gym = await Gym.findByPk(gym_id, {transaction:t});
        if(!user){
            await t.rollback();
            return res.status(404).json({success:false, message:"User account not found"});
        }
        if(!gym){
            await t.rollback();
            return res.status(404).json({success:false,message:"Gym center not found"});
        }

        // Core Rule Validation: Does the user have enough credits for a day-pass?
        const cost = gym.credit_per_day;
        if(user.wallet_balance<cost){
            await t.rollback();
            return res.status(400).json({
                success:false,
                message:`Insufficient credits! This gym costs ${cost} credits, but you only have ${user.wallet_balance}.`
            });
        }
        // Balance Swap: Deduct from user, credit the gym owner

        user.wallet_balance -= cost;
        await user.save({transaction: t});

        gym.total_earned_credits += cost;
        await gym.save({ transaction:t});

        // Create the Attandance Log Entry
        const attendanceLog =  await Attendance.create({
            user_id:user.id,
            gym_id:gym.id,
        },{transaction:t});

        // Creste the Transaction Ledger Record
        await Transaction.create({
            user_id:user.id,
            gym_id : gym.id,
            amount: cost,
            type: "DEBIT",
        },{transaction:t});

        // Everything succeeded safely! Commit changes to PostgreSQL

        await t.commit();
        return res.status(200).json({
            success:true,
            message:"CHeck-in successful! welcome to the gym.",
            deducted_credits:cost,
            remaining_user_balance:user.wallet_balance,
            attendance_id:attendanceLog.id
        });
    }catch(error){
        await t.rollback();
        console.error("Critical error during check-in transaction:",error);
        return res.status(500).json({success:false, message:"Internal Transaction Error"});
    }
});

module.exports = router;