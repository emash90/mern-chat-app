const mongoose = require('mongoose')
const User = require('../models/userModel')

//create a new user

const registerUser = async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        console.log(req.body);
        //check if user with same email exits
        const userExists = await User.findOne({email})
        if(userExists) {
            res.status(400).json('user already exists')
         
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        })
        if(user) {
            res.status(201).json({
                _id: user.id,
                name: user.firstName,
                email: user.email,
            })
        } else{
        res.status(400)
        throw new Error('Invalid user data')
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        user.status = 'online'
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    registerUser,
    loginUser

}
