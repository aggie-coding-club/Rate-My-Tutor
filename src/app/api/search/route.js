import { NextResponse } from "next/server";



const { toUSVString } = require('util');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createDatabase(client, toInsert){ // ex: createDatabase(client, {username: "freakbob", password: "babyoil17000", email: "pickupdaphonebaby@yahoo.com"})
    const result = await client.db("rate_my_tutor").collection("users").insertOne(toInsert)
    console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function getDatabase(client, searchField, search){
    const query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } }
        ]
      };
      
    const to_return = await client.db("rate_my_tutor").collection("tutors").find(query);
    return to_return.toArray();
}

async function updateDatabase(client, user, newName){ 
    const result = await client.db("rate_my_tutor").collection("users").updateOne({username: user}, {$set: newName});
    console.log(result);
}

async function deleteDatabase(client, user){ // ex: deleteDatabase(client, "freakbob");
    const result = await client.db("rate_my_tutor").collection("users").deleteOne({username: user});
    console.log(result);
}
export async function CREATE(req) {
    const data = await req.json();

    const stringData = data.searchText;
    const uri = "mongodb+srv://lichengtx:iloveratemytutor@users.y0ul8.mongodb.net/?retryWrites=true&w=majority&appName=users";
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(uri); 
    
    const express = require('express');
    const app = express();

    await client.connect();

    const document = await createDatabase(client, stringData);
    
    await client.close();

    return NextResponse.json({document}, { status: 200 });
}

export async function POST(req) {
    //input data
    const data = await req.json();

    const stringData = data.searchText;

    //connect to mongo
    // const uri = "mongodb+srv://lichengtx:iloveratemytutor@users.y0ul8.mongodb.net/";
    const uri = "mongodb+srv://lichengtx:iloveratemytutor@users.y0ul8.mongodb.net/?retryWrites=true&w=majority&appName=users";
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(uri);  

    
    const express = require('express');
    const app = express();

    await client.connect();

    //query the database
    const document = await getDatabase(client, "lastName", stringData);
    //const document2 = await getDatabase(client, "lastName", stringData);
    //const document = await getDatabase(client)
    await client.close();
    
    return NextResponse.json({document}, { status: 200 });
}

