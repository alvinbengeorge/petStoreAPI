import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = client.db("work");
const collection = db.collection("petstoreAPI")

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

export {
    connectDatabase,
    client,
    add,
    edit,
    remove,
    view,
    viewAll
}