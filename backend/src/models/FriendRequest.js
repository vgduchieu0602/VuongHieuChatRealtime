import mongoose from 'mongoose'

const DB_NAME = 'FriendRequest'
const COLLECTION_NAME = 'FriendRequests'

const friendRequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        maxlength: 300
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

friendRequestSchema.index({from: 1, to: 1}, {unique: true})

friendRequestSchema.index({from: 1})

friendRequestSchema.index({to: 1})

const FriendRequest = mongoose.model(DB_NAME, friendRequestSchema)

export default FriendRequest