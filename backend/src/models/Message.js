import mongoose from 'mongoose'

const DB_NAME = 'Message'
const COLLECTION_NAME = 'Messages'

const messageSchema = new mongooose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    senderId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

messageSchema.index({conversationId: 1, createdAt: -1})

const Message = mongoose.model(DB_NAME, messageSchema)

export default Message