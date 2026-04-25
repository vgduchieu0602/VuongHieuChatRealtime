import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body

        if (!username || !password || !email || !firstName || !lastName) {
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
            username, password: hashedPassword, email,
            displayName: `${firstName} ${lastName}`,
        })
    } catch (error) {

    }
}