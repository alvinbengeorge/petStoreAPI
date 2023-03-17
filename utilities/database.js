import mongodb from 'mongodb';

const client = new mongodb.MongoClient(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connectDatabase() {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client;
}

export {
    connectDatabase,
}