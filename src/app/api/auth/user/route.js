// app/api/auth/user/route.js

import clientPromise from '../../../server/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: 'Not authenticated.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return new Response(JSON.stringify({ message: 'Invalid token.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
