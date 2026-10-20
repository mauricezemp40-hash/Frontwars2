import * as dotenv from "dotenv";
import { Cloudflare, TunnelConfig } from "./Cloudflare";
import { GameEnv } from "../core/configuration/Config";
import cluster from "cluster";
import { getServerConfigFromServer } from "../core/configuration/ConfigLoader";
import { startMaster } from "./Master";
import { startWorker } from "./Worker";

const config = getServerConfigFromServer();

dotenv.config();

// Main entry point of the application
async function main() {
  // Check if this is the primary (master) process
  if (cluster.isPrimary) {
    if (config.env() !== GameEnv.Dev && process.env.GAME_ENV !== "selfhost") {
      await setupTunnels();
    }
    for (const signal of ["SIGINT", "SIGTERM"] as const) {
      process.once(signal, () => {
        for (const worker of Object.values(cluster.workers ?? {})) worker?.kill("SIGTERM");
        process.exit(0);
      });
    }
    console.log("Starting master process...");
    await startMaster();
  } else {
    // This is a worker process
    console.log("Starting worker process...");
    await startWorker();
  }
}

// Start the application
main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

async function setupTunnels() {
  const cloudflare = new Cloudflare(
    config.cloudflareAccountId(),
    config.cloudflareApiToken(),
    config.cloudflareConfigPath(),
    config.cloudflareCredsPath(),
  );

  const domainToService = new Map<string, string>().set(
    config.subdomain(),
    // TODO: change to 3000 when we have a proper tunnel setup.
    "http://localhost:80",
  );

  for (let i = 0; i < config.numWorkers(); i++) {
    domainToService.set(
      `w${i}-${config.subdomain()}`,
      `http://localhost:${3000 + i + 1}`,
    );
  }

  if (!(await cloudflare.configAlreadyExists())) {
    await cloudflare.createTunnel({
      domain: config.domain(),
      subdomain: config.subdomain(),
      subdomainToService: domainToService,
    } as TunnelConfig);
  } else {
    console.log("Config already exists, skipping tunnel creation");
  }

  await cloudflare.startCloudflared();
}
