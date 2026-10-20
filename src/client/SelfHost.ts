/** Public build settings only: never put credentials in GAME_SERVER_URL. */
export const gameServerUrl = process.env.GAME_SERVER_URL ?? "";
export const singlePlayerOnly = process.env.SINGLEPLAYER_ONLY === "true";
