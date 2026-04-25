import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            family: 4,
            connectTimeoutMS: 5000
        }).then(() => {
            console.log("Kết nối thành công!");
        }).catch(err => {
            console.error("Lỗi kết nối:", err);
        });
    } catch (error) {
        console.error('Error to connect to MongoDB:', error);
        process.exit(1)
    }
}