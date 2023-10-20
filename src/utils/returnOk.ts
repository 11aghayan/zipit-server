import { Response } from "express";

export default function (res: Response, status: number = 200 ) {
  return res.status(status).json({ ok: true });
} 