const express = require('express')
const colors = require('colors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5500
const connectDB = require('./config/db')
const path = require('path')

// Connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/listings', require('./routes/listingRoutes'))
app.use('/api/companies', require('./routes/companyRoutes'))
app.use('/api/skills', require('./routes/skillRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    )
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the GetAJob API' })
    })
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

app.use(errorHandler)
