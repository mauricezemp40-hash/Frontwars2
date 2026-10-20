import { mkdtemp, readdir, rm } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { readLocalRecord, writeLocalRecord } from "../../src/server/LocalArchive";
import { GameRecord } from "../../src/core/Schemas";

describe("Independent replay storage", () => {
  let directory: string;
  const previousDirectory = process.env.DATA_DIR;
  beforeEach(async () => {
    directory = await mkdtemp(path.join(tmpdir(), "frontwars-archive-"));
    process.env.DATA_DIR = directory;
  });
  afterEach(async () => {
    if (previousDirectory === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDirectory;
    await rm(directory, { recursive: true, force: true });
  });

  test("redacts identities without modifying the live record and atomically replaces a replay", async () => {
    const record = {
      info: { gameID: "Test0001", players: [{ persistentID: "private-identity" }] },
      turns: [],
    } as unknown as GameRecord;
    await writeLocalRecord(record);
    await writeLocalRecord(record);
    expect(record.info.players[0].persistentID).toBe("private-identity");
    const stored = await readLocalRecord("Test0001");
    expect(stored?.info.players[0].persistentID).toBe("REDACTED");
    expect(await readdir(path.join(directory, "games"))).toEqual(["Test0001.json"]);
  });

  test("distinguishes a missing replay and prevents path traversal", async () => {
    expect(await readLocalRecord("Missing1")).toBeNull();
    await expect(readLocalRecord("../../etc/passwd")).rejects.toThrow();
  });
});
