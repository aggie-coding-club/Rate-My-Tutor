// app/api/auth/login.js

import clientPromise from '../client/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { identifier, password } = req.body; // identifier can be email or username

    // Basic validation
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Please enter both identifier and password.' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      // Find the user by email or username
      const user = await db.collection('users').findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email/username or password.' });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email/username or password.' });
      }

      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' } // Token valid for 7 days
      );

      // Set the token in an HTTP-only cookie
      res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: '/',
      }));

      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
