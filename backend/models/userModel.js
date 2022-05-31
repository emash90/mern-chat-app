const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    newMessage: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'online'
    }
}, {timestamps: true}, {minimize: false})

//hash the password
userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){ 
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

//remove password from the user details sent back
userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    return userObj
}
//define schema findByCredentials method
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('invalid email or password')
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if(!isMatched) {
        throw new Error('invalid  credentials')
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User