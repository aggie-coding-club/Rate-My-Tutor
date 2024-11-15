// app/api/auth/login/route.js

import clientPromise from '../../../server/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = "KevinisHot";

export async function POST(request) {
  try {
    const { identifier, password } = await request.json(); // identifier can be email or username

    // Basic validation
    if (!identifier || !password) {
      return new Response(JSON.stringify({ message: 'Please enter both identifier and password.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = client.db("rate_my_tutor");

    // Find the user by email or username
    const user = await db.collection('users').findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid email/username or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Invalid email/username or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Set the token in an HTTP-only cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    });

    return new Response(JSON.stringify({ message: 'Login successful.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
