import express from "express";
import dotenv from 'dotenv';
import {
    getAllPets,
    getPet,
    addPet,
    removePet,
    editPet,
    userCreate,
    deleteUser
} from "./utilities/controller.js";

import { connectDatabase } from "./utilities/database.js";


dotenv.config();
const app = express();
app.use(express.json());
connectDatabase()


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pets', getAllPets);
app.get('/pets/:id', getPet);
app.post('/addpets', addPet);
app.patch('/editpet/:id', editPet);
app.post('/usercreate', userCreate);
app.delete("/deleteuser/", deleteUser);
app.delete('/deletepet/:id', removePet);


app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`);
});