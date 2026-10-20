# Verwendete Version

Quelle: https://github.com/Elitis/FrontWars, Branch main, historischer Commit
`3884ac688c243e75a1da4a7932ca75e9fc368bcf` vom 30. September 2025.
Instanzvariante: `selfhost1`. Maschinenlesbar: `source-version.json`.

Die am 20.10.2026 erneut abgerufene offizielle Datei
https://frontwars.io/about.txt erklärt die aktuelle Produktionsfassung als proprietär.
Der abgerufene Text ist in `references/frontwars-about-2026-10-20.txt` dokumentiert.
Diese Fassung wird nicht als aktuelle oder identische FrontWars-Produktion ausgegeben.

Der öffentliche HEAD `92ea569c91d82cbc44fb27416b0073b7f504241b` vom 13.11.2025
enthält einen Client mit fehlenden Schemas, neuen Karten-/Wirtschaftstypen und
Methoden, die die mitgelieferte Engine nicht bereitstellt. Auch die Oktoberfassung
`1d00f1031a3ac65f3c44b187e9b15c6d2b7d063a` ist in dieser Hinsicht unvollständig.
Anstatt eine neue Engine oder Ersatzregeln zu erfinden, verwendet dieses Projekt
den zusammenhängenden Septemberstand. Dieser ist ein FrontWars-spezifischer Fork,
mit FrontWars-Menü, Ressourcen und Anpassungen, kein umbenannter aktueller OpenFront-Download.

## Zuordnung zur gewünschten Referenz

| Bereich | Enthaltener Septemberstand | Unterschied / Grenze |
|---|---|---|
| Oberfläche | Originalmenü, Namen, Flaggen, Karte, Regler, Kontextaktionen, Hilfen, Einstellungen | Screenshot A ähnliche Struktur; Originalgröße des älteren Menüs, zusätzlicher Instanz-/Quellcodehinweis |
| Karten | 30 tatsächliche Binärkarten mit passenden Vorschauen | Keine Gleichheit mit dem aktuellen Kartenbestand zugesichert |
| Kämpfe | Originale neutrale Expansion, Angriffe, Terrainkosten, Wachstum | Keine neuen Balancewerte |
| Wirtschaft | Originale Truppen-/Goldlogik, Städte, Fabriken | Kein erfundener Arbeiterregler und keine neueren Economy-Modi |
| Gebäude | Stadt, Verteidigung, Hafen, Fabrik, Silo, SAM; Originalkosten und Bauzeiten | Elf Ersatzgrafiken auf frühere freigegebene Fassungen zurückgesetzt |
| Marine | Transporte, Kriegsschiffe, Handelsschiffe | Ursprüngliche Regeln; nicht jede Kombination im Browser geprüft |
| Bahn | RailNetwork, TrainStation, Railroad und TrainExecution vorhanden | Keine Gleichheit mit der heutigen Produktion zugesichert |
| Diplomatie | Bündnisse, Spenden, Embargos, Schnellnachrichten | Keine offiziellen Konten / Kontenübernahme |
| Waffen | Atom-, Wasserstoffbombe, MIRV und SAM | Ursprüngliche Regeln; mechanische Tests, keine vollständige manuelle Waffenpartie |
| Modi | Einzelspieler, öffentlich/privat, FFA und Teams, vier KI-Stufen | Keine zugesagte Classic-/Fast-/Chaos-Auswahl |
| Online | Zwei dauerhafte Worker, echtes WebSocket-Protokoll, getrennte Clients | Separater Spielserver zusätzlich zu Vercel erforderlich; keine große Lastprüfung |
| Replays | Originalwiedergabe plus lokales Serverarchiv | Ohne Backend auf Vercel kein persistentes Serverarchiv; laufende Partien nicht restartfest |
| Editor | Kein eigenständiger Editor in dieser Fassung bereitgestellt | Kein Nachbau des heutigen offiziellen Editors |

## Eng begrenzte Anpassungen

- `SelfHostConfig`, Konfigurationsauswahl und Startskript ersetzen die Abhängigkeit
  von offiziellen Match-/Kontoservern. `DefaultConfig` und alle Simulationsdateien
  bleiben unverändert gegenüber der gewählten Quelle.
- Der beim Erstellen zugeteilte Host-Client wird vor dem Beitritt in der bestehenden
  Spielkennung abgelegt, damit Hostrolle und authentifizierter Gast übereinstimmen.
- Master proxyt HTTP und WebSocket zu seinen zwei ursprünglichen Workern.
- Eigene kosmetische Metadaten sind leer; fremde bezahlte Inhalte werden nicht freigeschaltet.
- Browsermetadaten für das Spielende lesen Hostname und Versionskennung ohne
  einen Node-`process`-Zugriff; dieselbe Konfiguration funktioniert im Webworker,
  im Browser und auf dem eigenen Server.
- Replayablage statt fremdem R2-Konto; öffentliche Datensätze redigieren persistente Identitäten.
- Workerkennung wird beim Fork gespeichert, damit auch Worker 0 nach einem Absturz
  korrekt erkannt und neu gestartet werden kann. Healthcheck zählt bereite Worker.
- Vercel unterstützt statische Ressourcen und eine zustandslose HTTP-Weiterleitung.
  Die ursprüngliche Multiplayerarchitektur bleibt ein dauerhafter Node-Prozess.
- Fremde Analytics-/Werbeskripte und offizielle Domain-Metadaten aus der Startseite entfernt.
- TypeScript verwendet ES2021-Bibliotheksdeklarationen und überspringt kollidierende
  Deklarationsdateien der eingefrorenen Drittanbieterpakete; Anwendungscode wird weiter geprüft.
- Der ursprüngliche JSON-Transport wandelt Goldbeträge in Dezimalzeichenketten um,
  während das Empfangsschema nur `bigint` akzeptiert. `DonateGoldIntentSchema`
  liest jetzt genau dieses verlustfreie Format ein; der Server nutzt den vorhandenen
  BigInt-Replacer auch für Spielzüge und Start-/Wiederaufnahme-Nachrichten sowie
  die Client-Protokollierung dieser Nachrichten. Wirtschaft und Beträge bleiben
  unverändert. Regressionstests prüfen beide Übertragungsrichtungen und Fehlwerte.
- Einzige zusätzliche Laufzeitabhängigkeit: `http-proxy-middleware` 3.0.5.

## Lizenzen und Assets

Die Lizenztexte des Septemberstands bleiben erhalten: MIT für Server/gemeinsame
Engine, GPL-3.0 für den Client, gesonderte nichtkommerzielle Assetbedingungen.
Elf Dateien aus dem späteren Assetaustausch vom 28.09.2025 wurden auf ihre vorherigen,
öffentlich lizenzierten OpenFront-Fassungen aus
`e2afb18cdb75baf7e62d5834887e4ea3b721ae85` zurückgesetzt. Liste:
`references/restored-assets.txt`. Die in den neueren Quellen enthaltene proprietäre
Musik wurde nicht übernommen. Nichtkommerzielle Nutzung der entsprechenden Assets;
Attribution und vollständige Lizenz stehen im Projekt und im Quellcodeexport.

Die drei Steam-Screenshots im Auftragsdokument bleiben verlinkte visuelle Referenzen.
Sie werden nicht als Spielfläche, eigenes Produktbild oder Nachweis aktueller Übereinstimmung ausgegeben.
