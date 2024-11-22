const { MongoClient } = require("mongodb");

const listDatabases = async (req, res) => {
    console.log("HEllo hello hello")
    const client = req.app.locals.client;
    try {
        const databaseList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databaseList.databases.forEach(db => console.log(` - ${db.name}`));
        res.json(databaseList.databases);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error listing databases");
    }
};

const createDatabase = async (req, res) => {
    const client = req.app.locals.client;
    const toInsert = req.body; // Expects JSON
    try {
        const result = await client.db("rate_my_tutor").collection("users").insertOne(toInsert);
        console.log(`New listing created with the following id: ${result.insertedId}`);
        res.status(201).json({ insertId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating databse entry");
    }
};

const getDatabase = async (req, res) => {
    const client = req.app.locals.client;
    const user = req.params.username;
    try {
        const result = await client.db("rate_my_tutor").collection("users").find({ username: user });
        const data = result.toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving database entry");
    }
};

const updateDatabase = async (req, res) => {
    const client = req.app.locals.client;
    const user = req.params.username;
    const { newUsername, newPassword, newEmail } = req.body;
    try {
        const result = await client.db("rate_my_tutor").collection("users").updateOne(
            { username: user},
            { $set: { newUsername, newPassword, newEmail } }
        );

        if (result.matchedCount === 0) {
            return res.send(404).json({ message: "User not found" });
        }

        console.log("Updated document:", result);
        res.json({ message: "User updated successfully", modifiedCount: result.modifiedCount });
    } catch (err) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
}

const deleteDatabase = async (req, res) => {
    const client = req.app.locals.client;
    const user = req.params.username;
    try {
        const result = await client.db("rate_my_tutor").collection("users").deleteOne({ username: user });
        console.log(`Deleted ${result}`);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting database entry");
    }
}

module.exports = { listDatabases, createDatabase, getDatabase, updateDatabase, deleteDatabase };