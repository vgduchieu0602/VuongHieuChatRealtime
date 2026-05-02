import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { connectDB } from './libs/init.mongodb.js'

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import { AuthMiddleware } from './middlewares/auth.middleware.js'
dotenv.config()


const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());    //giúp express hiểu và đọc được request body dưới dạng json
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

//public routes
app.use('/api/auth', authRoute)

//private routes
app.use(AuthMiddleware)
app.use('/api/users', userRoute)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
