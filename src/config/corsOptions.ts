import cors from 'cors';

export const allowedOrigins = [
  'https://zipit-admin.onrender.com',
  'https://zipit.am',
  'https://zipit-public.onrender.com',
  'http://localhost:5173',
  'http://localhost:4173'
];

export const publicCors = cors({
  origin: [allowedOrigins[1], allowedOrigins[2], allowedOrigins[3], allowedOrigins[4]],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export const adminCors = cors({
  origin: [allowedOrigins[0], allowedOrigins[3]],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});