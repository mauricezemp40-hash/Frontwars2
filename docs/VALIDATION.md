# Prüfstand

Prüfung in der Cloud-Umgebung am 20.10.2026 mit Node.js 24.19.0 und Chromium.
Diese Datei unterscheidet lokalen Nachweis von noch ausstehender Veröffentlichung.

## Nachgewiesen

- Produktionsbuild der ausgewählten Originalbasis und der Selbsthosting-Anpassungen.
- TypeScript-Prüfung des Anwendungscodes.
- 39 Jest-Suites mit 294 bestandenen Tests: 292 vorhandene Tests plus zwei Tests
  für Replayablage, Identitätsredaktion und Pfadbegrenzung.
- Sechs zusätzliche Node-Integrationstests: ehrlicher Einzelspielerbetrieb ohne
  Backend, Fehler bei nicht erlaubten Pfaden und reale HTTP-Weiterleitung von
  Methoden, Lobbyparametern und Request-Bodies an einen konfigurierten Server;
  verlustfreies Goldformat und tatsächlicher Server-Broadcast samt Wiederaufnahme;
  Spielabschluss/Ergebnisaufbau ohne Node-Umgebung im Browser.
- Hauptmenü mit Karten, Schriften und Originalbedienelementen im Browser:
  keine JavaScriptfehler oder fehlgeschlagenen Ressourcenanforderungen.
- Einzelspieler lädt eine echte Binärkarte, startet die Simulation und erlaubt die Startplatzwahl.
- Vercel-Einzelspielerpartie bis zum echten Sieg: 341591 von 420336 Landfeldern
  auf Pangaea, unveränderte FFA-Sieggrenze über 80 Prozent. Transport, Landung,
  Expansion und Ergebnisablage im Browser erfolgreich, keine JavaScriptfehler.
- Zwei getrennte Browserprofile erstellen/betreten dieselbe private Lobby,
  starten dieselbe Partie und expandieren beide auf tatsächlichen Kartenflächen.
- Bündnisannahme ändert die echten Spielerbeziehungen in beiden Simulationen.
- Unterbrochener WebSocket verbindet sich mit demselben Spieler wieder.
- 37 gemeinsame Simulationshashes beider Browser bis einschließlich Tick 360 nach
  Expansion und Spende stimmen überein; keine Desyncmeldung oder JavaScriptfehler.
- Browserrefresh stellt denselben Spieler samt tatsächlichem Gebiet und gespendetem
  Gold wieder her. Explizite Goldspende verschiebt den Ressourcenunterschied um 2000
  (1000 beim Sender abgezogen, 1000 beim Empfänger hinzugefügt).
- Ein echter Transport fährt über Wasser zur zweiten Landmasse der Pangaea-Karte
  und erzeugt dort eine wirkliche Landung mit neuem Landbesitz.
- Separater Docker-Container startet mit zwei bereiten Workern; `/health` und
  die tatsächlichen Worker-HTTP-Routen antworten erfolgreich.
- Vercel-Ausgabe lokal mit derselben Gatewayfunktion geladen: Einzelspieler sichtbar,
  Lobbybuttons ohne Backend deaktiviert, keine JavaScriptfehler.

Der Browsercheck verwendet die vorhandenen Lobbyoptionen Pangaea, keine Bots und
keine Nationen für reproduzierbare Netzwerkvergleiche. Er schreibt keine Ressourcen
in die Simulation und ändert keine Regeln. Einzelspieler-Endprüfung verwendet
zusätzlich die bereits vorhandenen Optionen unendliche Truppen/Gold und Sofortbau.

Screenshots und maschinenlesbare Berichte liegen lokal im ignorierten Ordner `artifacts/`.
Reproduzierbare Browserprogramme: `scripts/browser-smoke.py`,
`scripts/singleplayer-smoke.py`. Sie benötigen Python Playwright und Chromium.

## Grenzen

Keine tatsächliche öffentliche Domain veröffentlicht oder von außen getestet.
Vercel-Konto/Projekt und dauerhafter Multiplayerhost sind noch nicht verbunden.
Keine Zusage zur Erreichbarkeit in einem Schulnetz. Keine Lastprüfung mit mehr als
zwei menschlichen Clients und keine zugesagte Kapazität aus den unveränderten
höheren Lobbygrenzen. Kein vollständiger Bildvergleich aller Dialoge der heutigen
proprietären Produktionsversion.

Angriffe, Gebäude, Spenden, Marine, Handel, Bahn, Atomwaffen und SAM besitzen Tests
in der vorhandenen Suite; nicht alle dieser Abläufe wurden zusätzlich manuell in
einer langen Browserpartie durchgespielt. Browserrefresh und vorübergehender Socketabbruch wurden getrennt geprüft.
Die ursprüngliche Simulation läuft deterministisch in den Clients; der Spielserver
ordnet und verteilt Befehle und vergleicht deren Hashes. Sie wurde nicht zu einer
neuen serverautoritativen Engine umgebaut. Das optionale private Gatekeeper-Modul
ist nicht enthalten; der vorhandene Express-Ratelimiter bleibt aktiv.

Vercel wurde durch Produktionsbuild und lokale Ausführung des Gateways geprüft,
nicht durch eine Veröffentlichung im persönlichen Vercel-Konto.

## Korrektur des ersten Vercel-Builds

Das Vercel-Protokoll für Commit `8974b68` zeigte eine fehlende
`src/client/data/countries.json`. Eine zu breite Git-Ignore-Regel `data/`
hatte neben lokalen Replaydaten auch diese benötigte Quelldatei ausgeschlossen.
Die Regel ist auf `/data/` im Projektstamm begrenzt, die Länderdatei wird
versioniert. Der Quellcode-Export schließt ebenfalls nur Replaydaten im
Projektstamm aus und enthält die benötigten Clientdaten.

Gegenprüfung: Mit `git checkout-index` wurde ein separater Projektstand allein
aus den zu versionierenden Dateien erstellt. Nur `node_modules` wurde als
bereits installierter Abhängigkeitsordner eingebunden. `VERCEL=1 npm run build`
inklusive TypeScript-Prüfung und Quellcode-Export sowie alle sechs
Node-Integrationstests waren erfolgreich. Die Länderdatei ist im erzeugten ZIP
enthalten; lokale Replaydaten sind ausgeschlossen.
