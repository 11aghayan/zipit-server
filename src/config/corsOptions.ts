import cors from 'cors';

export const allowedOrigins = [
  'https://zipit-admin.onrender.com',
  'https://zipit.am',
  'https://zipit-public.onrender.com'
];

export const publicCors = cors({
  origin: [allowedOrigins[1], allowedOrigins[2]],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export const adminCors = cors({
  origin: [allowedOrigins[0]],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});