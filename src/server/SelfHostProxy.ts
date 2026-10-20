import { Express } from "express";
import { Server } from "http";
import { Socket } from "net";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ServerConfig } from "../core/configuration/Config";

/** Preserve the original worker protocol behind one HTTP/HTTPS origin. */
export function installSelfHostProxy(app: Express, server: Server, config: ServerConfig) {
  const proxy = createProxyMiddleware({
    target: "http://127.0.0.1:3001",
    pathFilter: (pathname) => /^\/w\d+(?:\/|$)/.test(pathname),
    router: (req) => {
      const match = /^\/w(\d+)(?:\/|$)/.exec(req.url ?? "");
      const index = Number(match?.[1]);
      if (!match || index >= config.numWorkers()) throw new Error("Unknown worker");
      return `http://127.0.0.1:${config.workerPortByIndex(index)}`;
    },
    on: {
      error: (_error, _req, res) => {
        if ("writeHead" in res) {
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Game worker unavailable; please retry" }));
        } else {
          res.destroy();
        }
      },
    },
  });
  app.use((req, res, next) => {
    const match = /^\/w(\d+)(?:\/|$)/.exec(req.url);
    if (match && Number(match[1]) >= config.numWorkers()) {
      res.status(404).json({ error: "Unknown worker" });
      return;
    }
    return proxy(req, res, next);
  });
  server.on("upgrade", (req, socket, head) => {
    if (!(socket instanceof Socket)) { socket.destroy(); return; }
    const match = /^\/w(\d+)(?:\/|$)/.exec(req.url ?? "");
    if (!match || Number(match[1]) >= config.numWorkers()) {
      socket.end("HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n");
      return;
    }
    proxy.upgrade(req, socket, head);
  });
}
