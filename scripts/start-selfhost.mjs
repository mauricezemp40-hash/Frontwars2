import "dotenv/config";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
if (!existsSync("static/index.html")) {
  console.error("Frontend fehlt. Zuerst npm run build ausführen.");
  process.exit(1);
}
const child = spawn(
  process.execPath,
  ["--import", "tsx", "src/server/Server.ts"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      GAME_ENV: "selfhost",
      GIT_COMMIT:
        process.env.GIT_COMMIT ||
        "3884ac688c243e75a1da4a7932ca75e9fc368bcf-selfhost1",
      ADMIN_TOKEN: process.env.ADMIN_TOKEN || randomBytes(32).toString("hex"),
    },
  },
);
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 1));
