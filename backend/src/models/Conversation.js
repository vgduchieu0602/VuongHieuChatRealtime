import mongoose from 'mongoose'

const DB_NAME = 'Conversation'
const COLLECTION_NAME = 'Conversations'

const participantsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
},{
    _id: false
})

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    _id: false
})

const lastMessageSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    content: {
        type: String
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: null
    }
}, {
    _id: false
})

const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['group', 'direct'],
        required: true
    },
    participants: {
        type: [participantsSchema],
        required: true
    },
    group: {
        type: groupSchema
    },
    lastMessageAt: {
        type: Date,
    },
    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage: {
        type: lastMessageSchema,
        default: null
    },
    unreadCounts: {
        type: Map,
        of: Number,
        default: {}
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME
})

conversationSchema.index({"participant.userId": 1, lastMessage: -1})

const Message = mongoose.model(DB_NAME, conversationSchema)

export default Message