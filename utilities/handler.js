import { nanoid } from "nanoid";
import dotenv from 'dotenv';
import { add, remove, edit, viewAll, view } from "./database.js"

dotenv.config();

function authentication(req) {
    const { authorization } = req.headers;
    if (authorization != process.env.secret) {
        throw new Error({ message: "Unauthorized" });
    }
}

async function getAllPets(req, res) {
    try {
        const data = await viewAll();
        res.send(data);
    } catch (err) {
        res.send(err.message);
    }
}

async function getPet(req, res) {
    try {
        const { id } = req.params;
        const data = await view(id);
        res.send(data);
    } catch (err) {
        res.send({ "message": err.message })
    }
}

async function addPet(req, res) {
    try {
        authentication(req);
        const { name, type, age, color, owner, image } = req.body;
        const id = nanoid();
        const data = { id, name, type, age, color, owner, image };
        await add(data);
        res.send({ data, "message": "Pet added" });
    } catch (err) {
        res.send(err.message);
    }
}

async function removePet(req, res) {
    try {
        authentication(req);
        const { id } = req.params;
        await remove(id);
        res.send({ message: "Pet removed" });
    } catch (err) {
        res.send(err.message);
    }
}

async function editPet(req, res) {
    try {
        authentication(req);
        const { id } = req.params;
        const { name, type, age, color, owner, image } = req.body;
        const data = { name, type, age, color, owner, image };
        await edit(id, data);
        res.send({ message: "Pet edited", data });
    } catch (err) {
        res.send({ message: err.message });
    }
}


export {
    getAllPets,
    getPet,
    addPet,
    removePet,
    editPet
}