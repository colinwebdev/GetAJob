const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    let { username, email, password } = req.body

    // Validation
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exists
    let userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    // Create user
    let user = await User.create({
        username,
        email,
        password: hashedPass,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

// @desc Login a new user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    let { username, password } = req.body
    let user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    let user = {
        id: req.user._id, 
        email: req.user.email,
        username: req.user.username
    }
    res.status(200).json(user)
})

// Generate token
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
