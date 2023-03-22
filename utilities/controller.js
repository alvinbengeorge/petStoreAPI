import { nanoid } from "nanoid";
import dotenv from 'dotenv';
import { 
    add, 
    remove, 
    edit, 
    viewAll, 
    view, 
    userExists, 
    createUser, 
    filterData,
    deleteUserFromDatabase, 
} from "./database.js"
import { authentication, isOwner } from "./auth.js"
import { checkSchema } from "./schema.js";

dotenv.config();

async function userCreate(req, res) {
    try {
        await userExists(req.body.username);
        const { username, password } = req.body;
        await createUser(username, password);
        res.send({ message: "User created"});
    } catch (err) {
        console.log(err.message)
        res.send({"message": err.message});
    }
}

async function deleteUser(req, res) {
    try {
        const { username, password } = req.headers;
        await authentication(req);
        await deleteUserFromDatabase(username);
        res.send({ message: "User deleted"});
    } catch (err) {
        console.log(err.message)
        res.send({"message": err.message});
    }
}

async function getAllPets(req, res) {
    try {
        const data = await filterData(await viewAll());
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
        console.log(err.message)
        res.send({ "message": err.message })
    }
}

async function addPet(req, res) {
    try {
        await authentication(req);
        await checkSchema(req);
        const { name, type, age, color, image } = req.body;
        const id = nanoid();
        const owner = req.headers.username;
        const data = { id, name, type, age, color, owner, image };
        await add(data);
        res.send({  "message": "Pet added" });
    } catch (err) {
        console.log(err.message)
        res.send(err.message);
    }
}

async function removePet(req, res) {
    try {
        await authentication(req);
        await isOwner(req, req.params.id);
        const { id } = req.params;
        await remove(id);
        res.send({ message: "Pet removed" });
    } catch (err) {
        console.log(err.message)
        res.send(err.message);
    }
}

async function editPet(req, res) {
    try {
        await authentication(req);
        await isOwner(req, req.params.id)
        await checkSchema(req);
        const { id } = req.params;
        const owner = req.headers.username
        const { name, type, age, color, image } = req.body;
        const data = { name, type, age, color, owner, image };
        await edit(id, data);
        res.send({ message: "Pet edited"});
    } catch (err) {
        console.log(err.message)
        res.send({ message: err.message });
    }
}


export {
    getAllPets,
    getPet,
    addPet,
    removePet,
    editPet,
    userCreate,
    deleteUser
}