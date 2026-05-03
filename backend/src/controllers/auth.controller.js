import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import User from '../models/User.js'
import Session from '../models/Session.js'


const ACCESS_TOKEN_TTL = "30s"
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000

export const signUp = async (req, res) => {
    try {
        const { userName, password, email, firstName, lastName } = req.body

        if (!userName || !password || !email || !firstName || !lastName) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            })
        }

        const isExistEmail = await User.findOne({ email })

        if (isExistEmail) {
            return res.status(400).json({
                message: 'Email already exists',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            userName,
            password: hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`,
        })

        return res.status(201).json({
            message: 'User created successfully',
            success: true,
            data: newUser
        })
    } catch (error) {
        console.log("Error in sign-up controller: ", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const {userName, password} = req.body

        if(!userName || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            })
        }

        const user = await User.findOne({userName})

        if(!user) {
            return res.status(401).json({
                message: 'User not found',
                success: false
            })
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)
        
        if(!passwordCorrect) {
            return res.status(401).json({
                message: 'Invalid password',
                success: false
            })
        }

        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_TTL
        })

        const refreshToken = crypto.randomBytes(64).toString('hex')

        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //cookie không thể bị truy cập bởi javascritp
            secure: true, //cookie chỉ được gửi qua https
            sameSite: 'none', //backend, frontend deploy riêng
            maxAge: REFRESH_TOKEN_TTL
        })

        return res.status(200).json({
            message: `User ${user.userName} loggin successfully`,
            accessToken
        })
        
    } catch (error) {
        console.log("Error in sign-in controller: ", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
        
    }
}

export const signOut = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken

        if(token) {
            await Session.deleteOne({refreshToken: token})

            res.clearCookie('refreshToken')
        }

        return res.status(204).json({message: 'Sign out successfully'})
    } catch (error) {
        console.log(error)
    }
}

export const refreshToken = async (req, res) => {
    try {
        //Lấy refresh token từ cookie
        const token = req.cookies?.refreshToken

        if(!token) {
            return res.status(401).json({
                message: "Token không tồn tại"
            })
        }

        //So sánh với refresh token trong db
        const session = await Session.findOne({refreshToken: token})

        if (!session) {
            return res.status(403).json({
                message: "Token không hợp lệ hoặc đã hết hạn"
            })
        }

        //Kiểm tra hết hạn chưa
        if(session.expiresAt < new Date()) {
            return res.status(403).json({
                message: "Token đã hết hạn"
            })
        }

        //Tạo accessToken mới
        const accessToken = jwt.sign({userId: session.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL})

        //Trả về accessToken
        return res.status(200).json({message: "Tạo mới accessToken thành công", accessToken})
    } catch (error) {
        console.error("Lỗi khi gọi refreshToken: ", error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}