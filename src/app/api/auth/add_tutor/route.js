import clientPromise from '../../../server/server';

export async function POST(request) {
  try {
    const { firstName, lastName, rating, subject } = await request.json();

    // Basic validation
    if (!firstName || !lastName || !rating || !subject) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = client.db('rate_my_tutor');

    // Create the new tutor
    const tutor = await db.collection('tutors').insertOne({
      firstName,
      lastName,
      rating,
      subject,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Tutor added successfully.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding tutor:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
