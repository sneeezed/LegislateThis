import * as functions from "firebase-functions";
import next from "next";
import type {Request, Response} from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  // Point to your Next.js build output
  conf: {distDir: ".next"},
});
const handle = app.getRequestHandler();

export const nextServer = functions
  .runWith({memory: "1GB", timeoutSeconds: 60})
  .https.onRequest(async (req: Request, res: Response) => {
    await app.prepare();
    return handle(req, res);
  });
