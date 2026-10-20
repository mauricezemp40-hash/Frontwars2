# FrontWars – eigene Instanz

Spielbare ältere FrontWars-Version aus `Elitis/FrontWars`, Commit
`3884ac688c243e75a1da4a7932ca75e9fc368bcf` vom 30.09.2025.
**Keine offizielle Instanz und keine Kopie der aktuellen proprietären Version.**
Originalsimulation, Karten, Steuerung und Menüs bleiben erhalten.

## Start

Voraussetzungen: Node.js 24, npm und Python 3 für den Quellcode-Export.

```sh
HUSKY=0 npm ci
npm run build
npm start
```

Der Server verwendet Port 3000, zwei interne Worker die Ports 3001–3002.
`GET /health` wird erst mit beiden bereiten Workern erfolgreich.
Liveprozesse müssen nach dem Wiederherstellen einer Cloud-Umgebung neu gestartet werden.
Das Verzeichnis `data/` enthält eigene Replaydateien; laufende Partien bleiben im RAM.

```sh
npm run typecheck
npm test -- --runInBand
npm run test:selfhost
```

Optionaler Browsercheck mit Python Playwright und Chromium:
`python3 scripts/browser-smoke.py`. Er verbindet zwei getrennte Browserprofile
mit demselben echten Spielserver und vergleicht dessen Simulationshashes.

## Vercel

1. Diesen vollständigen Projektstand in dein GitHub-Repository übernehmen.
2. In Vercel das Repository importieren. Framework **Other**, Node.js **24.x**.
3. `vercel.json` übernimmt Installation, Build, Ausgabeordner `static` und API-Routen.
4. Deployen. Ohne weitere Einstellungen funktioniert **Einzelspieler**.

Vercel vergibt beim Deploy eine eigene HTTPS-Adresse. Eine solche öffentliche
Adresse wurde in dieser Arbeitsumgebung noch nicht erstellt oder geprüft.

Für **Onlinepartien** zusätzlich den enthaltenen Node-/Docker-Server auf einem
Host mit dauerhaften WebSocket-Verbindungen betreiben. In Vercel dann die öffentliche
HTTPS-Ursprungsadresse als `GAME_SERVER_URL` setzen und **neu deployen**.
Die Variable ist öffentlich, kein Passwort, und darf keine Zugangsdaten enthalten.
HTTP-Aufrufe laufen über die kleine Vercel-Gatewayfunktion; WebSockets verbinden sich
direkt mit deinem Spielserver. Vercel Functions betreiben selbst keine dauerhafte
Spielsimulation. Ohne Backend sind Lobbybuttons bewusst deaktiviert.

## Eigener Spielserver mit HTTPS

Auf einem eigenen Docker-Server mit auf ihn zeigender Domain:

```sh
cp selfhost.env.example .env
# SITE_ADDRESS in .env auf deine Domain setzen
# Domain-DNS sowie eingehende Ports 80/443 müssen zum Server zeigen.
docker compose up -d --build
```

Caddy beschafft und erneuert TLS-Zertifikate und leitet WebSockets weiter.
Nur Caddy wird öffentlich exponiert; interne Worker bleiben intern.
`game-data`, `caddy-data` und `caddy-config` müssen erhalten bleiben.
Alternativ kann ein geeigneter Containerhost direkt `Dockerfile.selfhost` verwenden
und HTTPS für den Containerport 3000 bereitstellen.

`ADMIN_TOKEN` wird beim Start zufällig im Speicher erzeugt, sofern er nicht sicher
injiziert wurde. Er wird weder ausgegeben noch im Client ausgeliefert.
Offizielle Konten, Käufe, Werbung, Telemetrie und globale Ranglisten sind nicht verbunden.

## Herkunft, Rechte und Übergabe

- [Version und Unterschiede](docs/VERSION.md)
- [Prüfergebnisse](docs/VALIDATION.md)
- [Original-README](docs/UPSTREAM-README.md)
- [Auftrag mit den drei Originalbild-Referenzen](docs/REQUIREMENTS.md)
- [Lizenz](LICENSE), vollständige GPL unter `src/client/LICENSE-GPL.txt`
- [Asset-Attribution](resources/about.txt)

`npm run build` erstellt außerdem `static/source.zip`: vollständiger Projektcode,
Karten, Lizenztexte und Dokumentation ohne Schlüssel, Nutzerdaten oder Abhängigkeitscaches.
Die Webseite verlinkt diesen Export im Fußbereich. Die vom Nutzer angelegte Datei
`Frontwars` bleibt unverändert erhalten.
