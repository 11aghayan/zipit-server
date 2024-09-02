import cors from 'cors';

export const allowedOrigins = [
  'https://garikaghayan.top',
  'https://admin.garikaghayan.top',
  'https://zipit-public.onrender.com'
];

export const publicCors = cors({
  origin: [allowedOrigins[0]],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export const adminCors = cors({
  origin: [allowedOrigins[1]],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});