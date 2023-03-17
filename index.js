import express from "express";
import dotenv from 'dotenv';

import { connectDatabase } from "./utilities/database.js";


dotenv.config();
const app = express();
connectDatabase()


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`);
});