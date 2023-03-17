import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new mongodb.MongoClient(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = client.db("loginAPI");

async function connectDatabase() {
    await client.connect();
    return client;
}

export {
    connectDatabase,
    client
}