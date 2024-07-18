const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');
const { JWT_SECRET } = require('../config');


const userSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signup', async (req, res) => {
    const body = req.body;
    const success = userSchema.safeParse(body);
    if (!success) {
        return res.json({
            msg: "Incorrect inputs"
        })
    }

    const existinguser = await User.findOne({
        username: req.body.username
    })
    if (existinguser) {
        return res.json({
            msg: "Email already taken"
        })
    }

    const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    })

    const userId = user._id;

    const account = await Account.create({
        userId,
        balance: 1+ Math.random() * 10000
    })

    const token = jwt.sign({ userId }, JWT_SECRET)

    res.json({
        msg: "User created successfully",
        token: token,
        balance: account.balance
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {

    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
        return res.json({
            msg: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    const account = await Account.findOne({ userId: user._id });

    const userId = user._id

    if (user) {
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            token: token,
            balance: account.balance
        })
        return;
    }

    res.json({
        msg: "Error while logging in"
    })
})

const updateSchema = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {

    const { success, data } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            msg: "Error while updating information"
        })
    }

    const updateResult = await User.updateOne(
        { _id: req.userId },  // Filter by userId
        { $set: data }        // Update data
    );

    res.json({
        msg: "Updated Successfully!"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = router;