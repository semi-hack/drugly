import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = ""

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const ConnectDb = async () => {
    await mongoose.connect(URI, options);
    console.log('Db connected.....')
}

export default ConnectDb;