// app/api/auth/signup.js

import clientPromise from '../client/server';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    // Basic validation
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      // Check if email or username already exists
      const existingUser = await db.collection('users').findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res.status(409).json({ message: 'Email or Username already in use.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const user = await db.collection('users').insertOne({
        email,
        username,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
