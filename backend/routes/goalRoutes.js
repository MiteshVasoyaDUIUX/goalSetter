const express = require('express');
const router = express.Router();
const goalSchema = require('../schema/goalSchema');
const { protect } = require('../middleware/authMiddleware');
const userSchema = require('../schema/userSchema');
const { update } = require('../schema/goalSchema');

//* Get All Goals...
router.get('/goal', protect, async (req, res) => {
    const goals = await goalSchema.find({ user: req.user.id });
    res.json(goals);
});

//* Create Goal...
router.post('/goal', protect, async (req, res) => {
    const goal = await goalSchema.create({
        user: req.user.id,
        goal: req.body.goal        
    });

    res.json(goal);
});

//* Update Goal...
router.put('/:id', protect, async (req, res) => {
    const goal = await goalSchema.findById(req.params.id);

    if (!goal) {
        throw new Error('Goal Not Exist...');
    }

    const user = await userSchema.findById(req.user.id);

    if (!user) {
        throw new Error('User Not Exist...');
    }

    if(goal.user.toString() !== req.user.id){
        throw new Error('Not Authorized');
    }

    const updatedGoal = await goalSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.json(updatedGoal);
});

//* Delete Goal...
router.delete('/:id', protect, async (req, res) => {

    const goal = await goalSchema.findById(req.params.id);

    if (!goal) {
        throw new Error('Goal Not Exist...');
    }

    const user = await userSchema.findById(req.user._id);

    if (!user) {
        throw new Error('User Not Exist...');
    }

    // console.log("User Name in Goal : ", goal.user.toString(), "User Name from request : ", req.user.id);

    if(goal.user.toString() !== req.user.id){
        throw new Error('Not Authorized');
    }

    await goal.remove();

    res.json(goal);
});

module.exports = router;