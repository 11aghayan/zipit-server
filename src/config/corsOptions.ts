import cors from 'cors';

export const allowedOrigins = [
  'https://admin.zipit.am',
  'https://zipit.am'
];

export const publicCors = cors({
  origin: [allowedOrigins[1]],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

export const adminCors = cors({
  origin: [allowedOrigins[0]],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});