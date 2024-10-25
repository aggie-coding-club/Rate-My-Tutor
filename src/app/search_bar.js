const { toUSVString } = require('util');

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
    const to_return = await client.db("rate_my_tutor").collection("users").findOne({username: user});
    return to_return;
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

    
    const express = require('express');
    const app = express();

    


    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //await createDatabase(client, {username: "freakbob", password: "babyoil17000", email: "pickupdaphonebaby@yahoo.com"})
        //await updateDatabase(client, "newpassword", {username: "shlopenheimer", password: "myundies"});
        //await listDatabases(client);
        await app.listen(2000, function() {  console.log('listening on 2000')})
        await app.get('/', async function(req, res) {
            const client = new MongoClient(uri);  
            //const results = await client.db("rate_my_tutor").collection("users").find({}).toArray();
            const results = await deleteDatabase(client, "freakbob");
            // const formattedResults = results.map(result => ({
            //     _id: result._id,
            //     username: result.username
            // }));
            res.json(results);
        })// Note: request and response are usually written as req and res respectively.
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}



main().catch(console.error);