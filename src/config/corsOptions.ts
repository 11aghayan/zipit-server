import cors from 'cors';

export const allowedOrigins = [
  'https://zipit.am',
  'https://zipit-admin.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173'
];

export const publicCors = cors({
  origin: allowedOrigins[0],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export const adminCors = cors({
  origin: allowedOrigins[1],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});