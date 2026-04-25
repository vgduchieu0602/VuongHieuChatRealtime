import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './libs/init.mongodb.js'
import authRoute from './routes/auth.route.js'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());    //giúp express hiểu và đọc được request body dưới dạng json

//public routes
app.use('/api/auth', authRoute)

//private routes

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
