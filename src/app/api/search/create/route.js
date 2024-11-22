import clientPromise from "@/app/server/server";


export async function POST(req) {
    const rawBody = await req.text(); // Read the raw stream as text
    const parsedBody = JSON.parse(rawBody); // Parse the JSON string

    console.log('Parsed Body:', parsedBody);

    // Destructure the required fields
    
    const { firstName, lastName, rating, subject } = parsedBody;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const rating = req.body.rating;
    // const subject =  req.body.subject;
    
    // if (!firstName || !lastName || !subject) {
        //     return res.status(400).json({ error: "Missing required fields" });
        // }
        
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
                // createdAt: new Date(), // Optional: Add a timestamp
            });

            console.log('Tutor added with ID:', result.insertedId);
            return new Response(JSON.stringify({ message: 'Tutor added successfully', id: result.insertedId }), {
                status: 201,
                headers: { 'Content-Type': 'application/json'},
            });
        } catch (error) { 
            console.error('Error adding tutor:', error);
            return new Response(JSON.stringify({ error: "Internal server Error" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
}