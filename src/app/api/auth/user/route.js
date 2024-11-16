// app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import clientPromise from '../../../server/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = "KevinisHot";

export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rate_my_tutor");

    // Find user by email or username
    const user = await db.collection('users').findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Serialize cookie
    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      //secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    // Set cookie in response headers
    const response = NextResponse.json({ message: 'Login successful.' }, { status: 200 });
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
