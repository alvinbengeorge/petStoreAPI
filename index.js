import express from "express";
import dotenv from 'dotenv';
import {
    getAllPets,
    getPet,
    addPet,
    removePet,
    editPet,
    UserCreate
} from "./utilities/handler.js";

import { connectDatabase } from "./utilities/database.js";


dotenv.config();
const app = express();
connectDatabase()


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pets', getAllPets);
app.get('/pets/:id', getPet);
app.post('/allpets', addPet);
app.delete('/deletepet/:id', removePet);
app.patch('/editpet/:id', editPet);
app.post('/user', UserCreate);


app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`);
});