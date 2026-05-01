import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const AuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) {
            return res.status(401).json({
                message:"Không tìm thấy accessToken"
            })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if(err) {
                console.log(err)

                return res.status(403).json({
                    message: "Access token hết hạn hoặc không đúng"
                })
            }

            const user = await User.findById(decodedUser.userId).select('-password')

            if(!user) {
                return res.status(404).json({
                    message: "Người dùng không tồn tại"
                })
            }

            req.user = user
            next()
        })
    } catch (error) {
        console.log('Error in AuthMiddleware:', error)
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}