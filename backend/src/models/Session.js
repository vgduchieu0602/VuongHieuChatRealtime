import mongoose from 'mongoose'

const DB_NAME = 'Session'
const COLLECTION_NAME = 'Sessions'

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

//tự động xóa khi hết hạn
sessionSchema.index({expiresAt: 1}, {expireAfterSeconds: 0})

const Session = mongoose.model(DB_NAME, sessionSchema)

export default Session