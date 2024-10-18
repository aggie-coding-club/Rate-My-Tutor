async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
    /**
     * Connection URI
     */
    const uri = "mongodb+srv://lichengtx:iloveratemytutor@users.y0ul8.mongodb.net/?retryWrites=true&w=majority&appName=users";
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(uri);

    
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);