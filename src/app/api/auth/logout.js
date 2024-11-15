// app/api/auth/logout.js

import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    }));

    return res.status(200).json({ message: 'Logged out successfully.' });
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
