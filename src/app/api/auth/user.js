// app/api/auth/user.js

import clientPromise from '../client/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const client = await clientPromise;
      const db = client.db();

      const user = await db.collection('users').findOne(
        { _id: new require('mongodb').ObjectId(decoded.userId) },
        { projection: { password: 0 } } // Exclude password
      );

      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error('User fetch error:', error);
      return res.status(401).json({ message: 'Invalid token.' });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
