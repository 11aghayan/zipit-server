import { Response } from "express";

export default function (res: Response) {
  return res.status(500).json({ ok: false, message: 'Server side error' });
}