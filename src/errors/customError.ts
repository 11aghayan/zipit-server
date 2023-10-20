import { Response } from "express";

export default function (res: Response, status: number, message: string) {
  return res.status(status).json({ ok: false, message });
}