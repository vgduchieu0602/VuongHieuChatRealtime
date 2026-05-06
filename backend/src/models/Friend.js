import mongoose from 'mongoose'

const DB_NAME = 'Friend'
const COLLECTION_NAME = 'Friends'

const friendSchema = new mongoose.Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamp: true,
    collection: COLLECTION_NAME
})

friendSchema.pre('save', function(next) {
    const a = this.userA.toString()
    const b = this.userB.toString()

    if(a > b) {
        this.userA = new mongoose.Types.ObjectId(b)
        this.userB = new mongoose.Types.ObjectId(a)
    }

    next()
})

friendSchema.index({userA: 1, userB: 1}, {unique: true})

const Friend = mongoose.model('Friend', friendSchema)

export default Friend