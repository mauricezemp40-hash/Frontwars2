import { mkdir, readFile, rename, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { GameRecord } from "../core/Schemas";
import { ID } from "../core/BaseSchemas";
import { replacer } from "../core/Util";

function recordPath(id: string): string {
  ID.parse(id);
  return path.join(process.env.DATA_DIR ?? "data", "games", `${id}.json`);
}

export async function writeLocalRecord(record: GameRecord): Promise<void> {
  const copy = structuredClone(record);
  // Match the upstream public replay export: never expose persistent identities.
  copy.info.players.forEach((player) => { player.persistentID = "REDACTED"; });
  const destination = recordPath(copy.info.gameID);
  await mkdir(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(copy, replacer), { mode: 0o600 });
  await rename(temporary, destination);
}

export async function readLocalRecord(id: string): Promise<GameRecord | null> {
  try {
    return JSON.parse(await readFile(recordPath(id), "utf8")) as GameRecord;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
