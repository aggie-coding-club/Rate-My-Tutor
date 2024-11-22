// app/api/auth/signup/route.js

import clientPromise from '../../../server/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { firstName, lastName, rating } = await request.json();

    // Basic validation
    if (!firstName || !lastName || !rating) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = await client.db('rate_my_tutor');

    // Check if email or username already exists
    const existingUser = await db.collection('tutors').findOne({
      $or: [{ firstname }, { lastName }],
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email or Username already in use.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await db.collection('tutors').insertOne({
      firstName,
      lastName,
      rating,
    });

    return new Response(JSON.stringify({ message: 'User created successfully.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
