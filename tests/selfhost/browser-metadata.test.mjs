import test from "node:test";
import assert from "node:assert/strict";
import { SelfHostServerConfig } from "../../src/core/configuration/SelfHostConfig.ts";
import { createGameRecord } from "../../src/core/Util.ts";

test("the real end-of-game record builder works without a Node process global in the browser", () => {
  const originalProcess = globalThis.process;
  const originalLocation = globalThis.location;
  let record;
  try {
    globalThis.location = { hostname: "game.example.com" };
    globalThis.process = undefined;
    record = createGameRecord("Test0001", {}, [], [], 1000, 5000,
      ["player", "Player01"], new SelfHostServerConfig());
  } finally {
    globalThis.process = originalProcess;
    if (originalLocation === undefined) delete globalThis.location;
    else globalThis.location = originalLocation;
  }
  assert.equal(record.domain, "game.example.com");
  assert.equal(record.subdomain, "");
  assert.equal(record.gitCommit, "3884ac688c243e75a1da4a7932ca75e9fc368bcf-selfhost1");
  assert.deepEqual(record.info.winner, ["player", "Player01"]);
});
