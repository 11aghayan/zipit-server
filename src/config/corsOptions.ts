import cors from 'cors';

export const allowedOrigins = [
  'https://zipit.am',
  'https://zipit-admin.vercel.app'
];

export const adminCors = cors({
  origin: allowedOrigins[0],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
  credentials: true
});

export const publicCors = cors({
  origin: allowedOrigins[1],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
  credentials: true
});