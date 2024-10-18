async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createDatabase(client, toInsert){
    const result = await client.db("rate_my_tutor").collection("users").insertOne(toInsert)
    console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function getDatabase(client, user){
    await client.db("rate_my_tutor").collection("users").findOne({username: user});
}

async function updateDatabase(client, user, newName){
    const result = await client.db("rate_my_tutor").collection("users").updateOne({username: user}, {$set: newName});
    console.log(result);
}

async function deleteDatabase(client, user){
    const result = await client.db("rate_my_tutor").collection("users").deleteOne({username: user});
    console.log(result);
}
async function main(){
    /**
     * Connection URI
     */
    const uri = "mongodb+srv://lichengtx:iloveratemytutor@users.y0ul8.mongodb.net/";
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(uri);


    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //createDatabase(client, {username: "master yi", password: "iloveratemytut", email: "lichengtx@gmail.com"})
        await listDatabases(client);
        await updateDatabase(client, "master yi", {username: "newpassword", password: "mynewpass"});
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}



main().catch(console.error);