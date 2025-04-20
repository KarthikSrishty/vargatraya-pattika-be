const mongoose=require("mongoose");
const express =require("express");
const {User}=require("../db");
const router=express.Router();

router.get('/',async(req,res)=>{
    const users=await User.find();
    return res.json({users});
});
router.get('/getuser/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { name, gothram, number, address,data1,data2 } = user;
        return res.json({ name, gothram , number, address ,data1,data2});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/:id/paymentstatus',async (req,res)=>{
    const { paymentStatus } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.paymentStatus=paymentStatus;
        await user.save();
        return res.status(200).json({ message: 'Payment Status Updated Successfully', user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.put('/addform1/:userid',async (req,res)=>{
    const { data } = req.body;
    const { userid } = req.params;
    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.data1=data;
        await user.save();
        return res.status(200).json({ message: 'Data added successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/addform2/:userid',async (req,res)=>{
    const { data } = req.body;
    const { userid } = req.params;
    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.data2=data;
        await user.save();
        return res.status(200).json({ message: 'Data added successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/adduser',async (req,res)=>{
    const {name,gothram,number,address,paymentStatus}=req.body;
    const user=await User.findOne({number});
    if(user){
        res.status(403).json({message:'User Already Exists with Phone Number ',number});
    } else{
        const newUser=new User({name,gothram,number,address,paymentStatus});
        await newUser.save();
        res.json(newUser);
    }
});


module.exports=router;