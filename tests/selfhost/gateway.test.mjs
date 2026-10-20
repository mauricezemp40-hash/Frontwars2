import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";
import handler from "../../api/gateway.js";

function response() {
  return {
    code: 200,
    headers: {},
    body: null,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
  };
}

test("Vercel serves real offline configuration and refuses fabricated online rooms", async () => {
  const previous = process.env.GAME_SERVER_URL;
  delete process.env.GAME_SERVER_URL;
  try {
    const env = response();
    await handler({ method: "GET", query: { route: "/api/env" } }, env);
    assert.deepEqual(env.body, { game_env: "selfhost" });
    const lobbies = response();
    await handler(
      { method: "GET", query: { route: "/api/public_lobbies" } },
      lobbies,
    );
    assert.deepEqual(lobbies.body, { lobbies: [] });
    const create = response();
    await handler(
      { method: "POST", query: { route: "/w0/api/create_game/Test0001" } },
      create,
    );
    assert.equal(create.code, 503);
    const traversal = response();
    await handler(
      { method: "GET", query: { route: "/w0/api/../../etc/passwd" } },
      traversal,
    );
    assert.equal(traversal.code, 404);
  } finally {
    if (previous === undefined) delete process.env.GAME_SERVER_URL;
    else process.env.GAME_SERVER_URL = previous;
  }
});

test("Vercel forwards lobby queries, methods and bodies to its configured game server", async () => {
  const previous = process.env.GAME_SERVER_URL;
  const received = [];
  const server = http.createServer(async (req, res) => {
    let body = "";
    for await (const chunk of req) body += chunk;
    received.push({ url: req.url, method: req.method, body });
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true }));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  process.env.GAME_SERVER_URL = `http://127.0.0.1:${server.address().port}`;
  try {
    const created = response();
    await handler(
      {
        method: "POST",
        query: {
          route: "/w1/api/create_game/Test0001",
          creatorClientID: "Host0001",
        },
        body: { bots: 0 },
      },
      created,
    );
    assert.equal(created.code, 200);
    assert.deepEqual(received[0], {
      url: "/w1/api/create_game/Test0001?creatorClientID=Host0001",
      method: "POST",
      body: '{"bots":0}',
    });
    const exists = response();
    await handler(
      { method: "GET", query: { route: "/w1/api/game/Test0001/exists" } },
      exists,
    );
    assert.equal(exists.code, 200);
    assert.equal(received[1].url, "/w1/api/game/Test0001/exists");
  } finally {
    if (previous === undefined) delete process.env.GAME_SERVER_URL;
    else process.env.GAME_SERVER_URL = previous;
    await new Promise((resolve) => server.close(resolve));
  }
});
