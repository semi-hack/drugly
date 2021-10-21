import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import router from './routes/'
import connectDb from './config/db.js';


dotenv.config();
ConnectDb();
const PORT = process.env.PORT || 4440


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use(router);



const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})

export default  server