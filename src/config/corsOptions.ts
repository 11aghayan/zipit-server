import cors from 'cors';

export const allowedOrigins = [
  'https://zipit.am',
  'https://zipit-admin.onrender.com'
];

export const publicCors = cors({
  origin: allowedOrigins[0],
  methods: ['GET'],
  allowedHeaders: '*'
});

export const adminCors = cors({
  origin: allowedOrigins[1],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*',
  credentials: true
});