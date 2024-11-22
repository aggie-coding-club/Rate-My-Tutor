// app/api/auth/signup/route.js

import clientPromise from '../../../server/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { username, first_name, last_name, email, password } = await request.json();

    // Basic validation
    if (!username || !first_name || !last_name || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = await client.db('rate_my_tutor');

    // Check if email or username already exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }],
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
    const user = await db.collection('users').insertOne({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
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
