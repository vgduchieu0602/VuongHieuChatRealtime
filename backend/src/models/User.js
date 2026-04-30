import mongoose from 'mongoose'

const DB_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avatarUrl: {
        type: String
    },
    avatarId: {
        type: String
    },
    bio: {
        type: String,
        maxLength: 200
    },
    phone: {
        type: String,
        sparse: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

const User = mongoose.model(DB_NAME, userSchema);

export default User;