import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.URI
// const URI = "mongodb+srv://admin:black@cluster0.du7z2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const ConnectDb = async () => {
    await mongoose.connect(URI, options);
    console.log('Db connected.....')
}

export default ConnectDb;