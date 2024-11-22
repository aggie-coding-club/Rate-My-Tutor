import clientPromise from "@/app/server/server";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, rating, subject } = req.body;

        if (!firstName || !lastName || !subject) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // Connect to MongoDB
            const client = await clientPromise;
            const db = client.db('rate_my_tutor'); // Replace with your database name
            const collection = db.collection('tutors'); // Replace with your collection name

            // Insert the tutor data into the database
            const result = await collection.insertOne({
                firstName,
                lastName,
                rating: Number(rating), // Ensure rating is stored as a number
                subject,
                createdAt: new Date(), // Optional: Add a timestamp
            });

            console.log('Tutor added with ID:', result.insertedId);
            return res.status(201).json({ message: 'Tutor added successfully', id: result.insertedId });
        } catch (error) {
            console.error('Error adding tutor:', error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}