/** Stateless HTTP adapter. The persistent game process never runs in Vercel. */
export default async function handler(req, res) {
  const route = req.query.route;
  if (typeof route !== "string" || !/^(?:\/api\/(?:env|public_lobbies|auth\/cosmetics\.json)|\/w[01]\/api\/[a-z_]+(?:\/[a-zA-Z0-9]{8}){0,2}(?:\/exists)?)$/.test(route)) {
    return res.status(404).json({ error: "Unknown game endpoint" });
  }
  res.setHeader("Cache-Control", "no-store");
  const backend = process.env.GAME_SERVER_URL;
  if (!backend) {
    if (req.method === "GET" && route === "/api/env") return res.json({ game_env: "selfhost" });
    if (req.method === "GET" && route === "/api/public_lobbies") return res.json({ lobbies: [] });
    if (req.method === "GET" && route === "/api/auth/cosmetics.json") return res.json({ patterns: {} });
    return res.status(503).json({ error: "Multiplayer is not configured on this instance. Single player is available." });
  }
  try {
    const origin = new URL(backend);
    if (origin.protocol !== "https:" && !(origin.protocol === "http:" && ["127.0.0.1", "localhost"].includes(origin.hostname))) {
      throw new Error("GAME_SERVER_URL must use HTTPS");
    }
    const target = new URL(route, origin.origin);
    // Only forward known game parameters; never expose arbitrary proxy targets.
    if (typeof req.query.creatorClientID === "string" && /^[a-zA-Z0-9]{8}$/.test(req.query.creatorClientID)) {
      target.searchParams.set("creatorClientID", req.query.creatorClientID);
    }
    const method = req.method ?? "GET";
    const response = await fetch(target, {
      method,
      headers: { "Content-Type": "application/json" },
      body: ["GET", "HEAD"].includes(method) ? undefined : (typeof req.body === "string" ? req.body : JSON.stringify(req.body)),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    res.setHeader("Content-Type", response.headers.get("Content-Type") ?? "application/json");
    return res.status(response.status).send(await response.text());
  } catch {
    return res.status(502).json({ error: "The game server is unavailable. Please try again later." });
  }
}
