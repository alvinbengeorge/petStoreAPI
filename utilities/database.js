import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = client.db("work");
const collection = db.collection("petstoreAPI")
const users = db.collection("users")

async function connectDatabase() {
    await client.connect();
    return client;
}

async function add(data) {
    const result = await collection.insertOne(data);
    return result;
}

async function edit(id, data) {
    const result = await collection.findOneAndUpdate({'id': id}, {$set: data});
    return result;
}

async function remove(id) {
    const result = await collection.findOneAndDelete( {'id': id} );
    return result;
}

async function view(id) {
    const result = await collection.findOne( {'id': id} );
    return result
}

async function viewAll() {
    const result = await collection.find().toArray();
    return result;
}

async function createUser(user, password) {
    const result = await users.insertOne({user, password});
    return result;
}

async function validateUser(user, password) {
    return await users.findOne({user, password});
}

async function UserExists(user) {
    const result = await users.findOne({user})
    if (result){
        throw new Error("User already exists");
    }
}

async function filterData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        const { id, name, type, age, color, owner, image } = data[i];
        newData.push({ id, name, type, age, color, owner, image });
    }
    return newData;
}


export {
    connectDatabase,
    client,
    add,
    edit,
    remove,
    view,
    viewAll,
    createUser,
    validateUser,
    UserExists,
    filterData
}