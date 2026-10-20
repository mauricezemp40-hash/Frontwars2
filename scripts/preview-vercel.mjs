// Local verification of Vercel's static output and stateless gateway contract.
import express from "express";
import handler from "../api/gateway.js";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  if (req.path.startsWith("/api/") || /^\/w[01]\/api\//.test(req.path)) {
    req.query.route = req.path;
    return handler(req, res);
  }
  next();
});
app.use(express.static(process.env.OUTPUT_DIR || "static-vercel"));
app.listen(4173, "127.0.0.1", () =>
  console.log("Vercel output check listening on port 4173"),
);
