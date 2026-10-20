import { DefaultServerConfig } from "./DefaultConfig";
import { GameEnv } from "./Config";

/** Deployment settings only. The original DefaultConfig owns all game rules. */
export class SelfHostServerConfig extends DefaultServerConfig {
  env(): GameEnv { return GameEnv.Prod; }
  numWorkers(): number { return 2; }
  jwtAudience(): string { return "frontwars-selfhost"; }
  jwtIssuer(): string { return "http://127.0.0.1:3000/api/auth"; }
  gitCommit(): string { return "3884ac688c243e75a1da4a7932ca75e9fc368bcf-selfhost1"; }
  subdomain(): string { return ""; }
  domain(): string {
    return typeof location !== "undefined" ? location.hostname : process.env.DOMAIN ?? "";
  }
  adminToken(): string {
    const token = process.env.ADMIN_TOKEN;
    if (!token) throw new Error("Start self-hosting with npm start so ADMIN_TOKEN is initialized");
    return token;
  }
}
