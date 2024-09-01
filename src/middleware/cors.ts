import { NextFunction, Request, Response } from 'express';

import { adminCors, publicCors } from '../config/corsOptions';

export default function(req: Request, res: Response, next: NextFunction) {
  const origin = req.get('origin');
  if (origin === 'https://zipit-admin.onrender.com') {
    adminCors(req, res, next);
  } else if (origin === 'https://garikaghayan.top') {
    publicCors(req, res, next);
  } else {
    // Handle other origins or no origin header as needed
    next();
  }
}