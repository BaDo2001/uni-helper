import mongoose from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    // eslint-disable-next-line no-console
    console.log('DB connected.');
};
