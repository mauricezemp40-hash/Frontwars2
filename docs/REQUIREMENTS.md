# FRONTWARS – MEGAPROMPT FÜR EINE MÖGLICHST IDENTISCHE EIGENE INSTANZ

Du übernimmst die vollständige technische Umsetzung einer eigenen, im Browser erreichbaren FrontWars-Instanz. Mein Ziel ist die originale FrontWars-Spielerfahrung: dieselbe Kartenansicht, dieselbe Bedienung, dieselben Menüs, dieselben Regeln und dieselben Spielabläufe der gewählten Referenzversion.

Ich möchte FrontWars über eine eigene Adresse spielen können. Entwickle dafür keinen neuen Fantasietitel und interpretiere die Oberfläche nicht kreativ um. Arbeite vorrangig mit einer tatsächlich verfügbaren, zur Wiederverwendung freigegebenen Originalcodebasis. Bewahre deren bestehende Simulation und Oberfläche so vollständig wie möglich.

Dieser Auftrag ist ein Implementierungsauftrag. Liefere eine funktionierende Anwendung mit echtem Spielablauf, nicht lediglich ein Konzept, ein Menü, einen klickbaren Screenshot oder eine Demo mit zufälligen Zahlen.

Wichtig für die Ausgangslage: Die am 20. Oktober 2026 abgerufene offizielle About-Datei bezeichnet den aktuellen FrontWars-Code als nicht öffentlich und proprietär. Ein öffentlich auffindbarer älterer Fork ist deshalb kein Beleg dafür, dass die aktuelle Produktionsversion vollständig verfügbar ist. Prüfe diesen Stand bei der Umsetzung erneut. Behaupte weder eine identische Version noch eine unveränderte Originalbasis, wenn das nicht nachgewiesen ist.

Die Bezeichnung «unblocked» beschreibt meinen Wunsch nach einer eigenen erreichbaren Spieladresse. Eine neue Adresse garantiert keine Freigabe in einem bestimmten Schulnetz. Liefere normales, eigenständiges Webhosting und beschreibe nur tatsächlich geprüfte Erreichbarkeit.

## 1. Verbindliche Referenzen

Primäre Spielreferenz:
https://frontwars.io/

Offizielle Funktionsübersicht und veröffentlichte Spielbilder:
https://store.steampowered.com/app/4002270/FrontWars/

Offizielle Angaben zum aktuellen Code und dessen Herkunft:
https://frontwars.io/about.txt

Originaler Karteneditor als Referenz, soweit in der Zielversion vorhanden:
https://frontwars.io/editor/

Öffentlich auffindbarer, archivierter Repository-Kandidat:
https://github.com/Elitis/FrontWars

Verwandte OpenFront-Codebasis für einen ausdrücklich gekennzeichneten möglichen Ersatz:
https://github.com/openfrontio/OpenFrontIO

Prüfe Repository, Version und tatsächlich enthaltene Dateien. Ein Repository mit dem Wort «FrontWars» im Namen kann ein älterer Fork, ein anderes Projekt oder nur eine README sein. Übernimm keine vermeintlichen Originalquellen ungeprüft.

## 2. Originalbilder als visuelle Vorgabe

Die folgenden Bilder sind veröffentlichte FrontWars-Screenshots von Steam-Bildservern. Sie dienen als echte visuelle Referenzen und sind keine generierten Entwürfe. Sie können eine ältere Spielversion zeigen. Wenn die aktuelle Browseroberfläche davon abweicht, dokumentiere die gewählte Zielversion und verwende deren Darstellung konsistent.

### Bild A – Hauptmenü und Einstieg

![FrontWars-Originalbild: Hauptmenü mit Kartenhintergrund und Einstieg in die nächste Partie](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4002270/f7c7cd0af5129e00948a27829372c8b628fa73c9/ss_f7c7cd0af5129e00948a27829372c8b628fa73c9.1920x1080.jpg?t=1761320774)

Bildadresse:
https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4002270/f7c7cd0af5129e00948a27829372c8b628fa73c9/ss_f7c7cd0af5129e00948a27829372c8b628fa73c9.1920x1080.jpg?t=1761320774

Beachte vor allem den Kartenhintergrund, die zentrale Anordnung, das Verhältnis zwischen Logo, Namenseingabe, Spielkarte und Einstiegsbuttons sowie die zurückhaltenden Bedienelemente. Der sichtbare Inhalt ist das Spielmenü, keine Werbe-Landingpage.

### Bild B – Laufende Partie, Weltkarte und Bedienfelder

![FrontWars-Originalbild: farbige Weltkarte mit Nationen, Truppenzahlen, Ressourcen und Ereignissen](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4002270/51e70709117b11a53e89286cff7507f984f2ddc2/ss_51e70709117b11a53e89286cff7507f984f2ddc2.1920x1080.jpg?t=1774507124)

Bildadresse:
https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4002270/51e70709117b11a53e89286cff7507f984f2ddc2/ss_51e70709117b11a53e89286cff7507f984f2ddc2.1920x1080.jpg?t=1774507124

Beachte die tatsächlich sichtbare politische Karte, Gebietsfarben, Beschriftungen, Truppenangaben, kompakten Ressourcenfelder, Regler und Ereignismeldungen. Die Karte bleibt der dominante Bildschirmbereich. Übernimm Anordnung und Proportionen der gewählten Originalversion.

### Bild C – Private Lobby und Kartenauswahl

![FrontWars-Originalbild: private Lobby mit Raumcode, Kartenraster und Spielstart](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4002270/cdb9c305b9fb6f061a9ee462c23aa762358af4db/ss_cdb9c305b9fb6f061a9ee462c23aa762358af4db.jpg)

Bildadresse:
https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4002270/cdb9c305b9fb6f061a9ee462c23aa762358af4db/ss_cdb9c305b9fb6f061a9ee462c23aa762358af4db.jpg

Beachte Raumcode, kopierbaren Einladungszugang, Kartenkacheln, ausgewählte Karte und Startaktion. Die Vorschaubilder müssen zu den tatsächlich geladenen Karten passen.

Nutze diese Screenshots zur Prüfung von Aussehen und Aufbau. Sie ersetzen keine spielbare Karte und keine echte Oberfläche. Die Bildreferenzen in der Dokumentation geben keine zusätzliche Freigabe für separat geschützte Grafiken oder Logos; deren Verwendung richtet sich nach den Rechten der gewählten Projektdateien.

## 3. Zuerst die passende Originalbasis bestimmen

Finde die technisch und inhaltlich passende verfügbare Version. Lies README, Lizenzdateien, Buildskripte, Paketdateien, Kartenverzeichnisse, Konfiguration, Client, Simulation und Server. Halte Repository-Adresse, Branch beziehungsweise Tag und vollständigen Commit fest.

Prüfe, ob der Kandidat tatsächlich FrontWars-spezifische Änderungen enthält. Ein unveränderter OpenFront-Fork darf nicht als aktuelle FrontWars-Version ausgegeben werden. Auch ein funktionierender älterer Stand ist zunächst nur dieser ältere Stand.

Erstelle eine kurze Zuordnung zwischen Zielversion und verfügbarer Basis: Oberfläche, Karten, Gebäude, Wirtschaft, Marine, Diplomatie, Raketen, Spielmodi und Onlinefunktionen. Unterscheide nachgewiesene Übereinstimmung, erkennbare Abweichung und unbekannten Stand.

Falls aktuelle freigegebene Originalquellen vorhanden sind, haben sie Vorrang. Sind nur ältere freigegebene Quellen vorhanden, verwende die nachvollziehbar nächste geeignete Basis und kennzeichne den tatsächlichen Stand. Private aktuelle Quellteile können nur verwendet werden, wenn sie tatsächlich bereitgestellt und zur Nutzung freigegeben sind.

Baue aus fehlender Quellenverfügbarkeit keine Behauptung, du hättest das neueste Original vollständig kopiert. Arbeite mit dem vorhandenen Material bis zu einem prüfbaren Ergebnis weiter und benenne konkrete verbleibende Abweichungen.

## 4. Möglichst wenig verändern

Erhalte Originalstruktur, vorhandene Engine, Rendertechnik, Steuerung, Regeln und Assets, soweit ihre Verwendung durch die Projektfreigabe gedeckt ist. Führe keinen kompletten Frameworkwechsel durch, nur weil du eine andere Bibliothek bevorzugst.

Die üblichen Anpassungen betreffen eigene Domain, Serveradressen, Umgebungsvariablen, Deployment, optionale Dienste und klar abgegrenzte Fehler der Selbsthosting-Konfiguration. Änderungen müssen klein und nachvollziehbar bleiben.

Verändere nicht eigenständig Kosten, Bauzeiten, Truppenwachstum, Angriffsformeln, Kartengrössen, Siegesbedingungen oder die Geschwindigkeit. Erfinde keine neuen Mechaniken. Wo ein Originalwert vorliegt, wird dieser übernommen. Wo er nicht verfügbar ist, wird eine notwendige Ersatzentscheidung ausdrücklich als Abweichung dokumentiert.

Behauptungen wie «optimiertes Balancing» oder «modernisiertes Design» sind kein Ersatz für die geforderte Übereinstimmung. Der Massstab ist die gewählte FrontWars-Referenzversion.

## 5. Eigenständige Instanz über eigene Adresse

Frontend und Spielbackend müssen für die eigene Instanz konfiguriert sein. Ersetze harte Abhängigkeiten zu Original-Spielservern dort, wo die verfügbare Codebasis eigene Server unterstützt. Rufe nicht weiterhin unbemerkt einen fremden offiziellen Matchserver auf.

Alle erforderlichen, mitgelieferten Karten, Schriftdateien, Icons, Sounds und Worker müssen auf der eigenen Veröffentlichung korrekt erreichbar sein. Prüfe Basispfade, Dateinamen, MIME-Typen, Cacheversionen und komprimierte Ressourcen.

Die Webseite soll über gewöhnliches HTTPS erreichbar sein, der Echtzeitkanal über eine passende sichere Verbindung. Ladefehler müssen nachvollziehbar gemeldet werden. Ein Button «Spielen», der lediglich zur Originalseite weiterleitet, erfüllt den Auftrag nicht.

Ein eingebettetes Original per iframe gilt nicht als eigenständig gehostetes Spiel. Ebenso wenig reicht eine lokale Entwicklungsvorschau für die Behauptung, Freunde könnten bereits öffentlich beitreten.

## 6. Identische Oberfläche der Zielversion

Bewahre Hauptmenü, Namenseingabe, Flaggenauswahl, Spielsuche, Einzelspieler, Lobbyerstellung, Lobbybeitritt, Einstellungen und Hilfebereiche entsprechend der vorhandenen Originalversion.

Übernimm Positionen, Reihenfolge, Grössenverhältnisse, Schriftbild, Farben, Rahmen, transparente Flächen, Hoverzustände und Auswahlmarkierungen aus der verwendbaren Originaloberfläche. Miss die Darstellung in vergleichbaren Bildschirmgrössen nach, statt grob ähnliche Panels zu zeichnen.

Entferne keine wichtigen Regler und verschiebe keine Originalanzeigen aus Designgründen. Dieselben Aktionen sollen auf demselben Weg erreichbar bleiben. Das gilt insbesondere für Angriffsanteil, Truppen- und Goldunterstützung, Bauauswahl und kontextabhängige Nationenaktionen.

Die eigenständige Instanz wird in einem zurückhaltenden Info- beziehungsweise Versionsbereich als solche erkennbar. Führe keine offiziellen Nutzerzahlen, Auszeichnungen oder Serverzustände an, die diese Instanz nicht besitzt.

## 7. Kartenansicht und Darstellung

Verwende die tatsächlichen Kartendaten und Darstellungsregeln der Basis. Küsten, Landmaske, Gewässer, Terrain und Startmöglichkeiten müssen mit der ausgewiesenen Version übereinstimmen.

Erhalte die typische flache FrontWars-Karte mit farbigen Gebieten, beweglichen Grenzen, Nationenbeschriftungen, Truppenangaben und darüberliegenden Spielelementen. Verwandle das Spiel nicht in eine Weltkugel, ein Provinzbrettspiel oder eine Oberfläche mit einzeln auswählbaren realen Staaten als unveränderlichen Feldern.

Zoom, Kamerabewegung, Zentrieren, Beschriftung und das Einblenden kleiner Details folgen dem Original. Dieselbe Kartenposition muss unabhängig von Bildschirmauflösung und Zoom korrekt angewählt werden.

Nutze die originale optimierte Kartenlogik. Ein dekoratives Hintergrundbild mit darüber angezeigten Zahlen reicht nicht aus. Eigentum muss sich auf den tatsächlichen spielbaren Flächen ändern und für alle Teilnehmer gleich dargestellt werden.

## 8. Start einer Partie

Übernimm das originale Verfahren zur Startplatzwahl beziehungsweise zum Zufallsstart, die vorhandenen Schutzphasen, Startressourcen und den Countdown. Bei einer gewählten Spielvariante gelten deren tatsächliche Regeln.

Spieler sehen ihren gewählten Namen, ihre Flagge und ihr Startgebiet. Ungültige Startpositionen werden entsprechend der Engine verhindert. Alle Teilnehmer gelangen gemeinsam vom Wartezustand in die aktive Simulation.

Ein Neustart des Browsers darf den Spieler nicht beliebig neu auf der Karte spawnen lassen. Laufende Partien, Zuschauerbeitritte und Wiederverbindungen werden über getrennte originale beziehungsweise sauber ergänzte Zustände behandelt.

## 9. Territorium, Expansion und Angriffe

Übernimm die vorhandenen Algorithmen für neutrale Expansion, zusammenhängende Grenzen, Eroberungsgeschwindigkeit und Terrainkosten. Angriffe werden mit dem originalen Truppenanteilregler ausgelöst und besitzen den vorgesehenen Verlauf.

Ein Angriff verändert tatsächlich Landbesitz und Ressourcen. Die Front breitet sich so aus, wie es die gewählte Originalversion vorsieht. Normale Landangriffe dürfen keine Meere überspringen oder beliebige entfernte Gebiete übernehmen.

Behalte Rückruf, Abbruch, Nachschub und die Anzeigen aktiver Angriffe bei, soweit sie in der Basis existieren. Verlorene und gebundene Truppen müssen in denselben Beständen verbucht sein wie im Original.

Ersetze den Kampf nicht durch eine Zufallsentscheidung mit anschliessender Umfärbung eines ganzen Landes. Prüfe gemeinsam mit der Originalsimulation, welche Einheiten und Grenzen nach jedem Schritt bestehen.

## 10. Bevölkerung, Arbeiter, Truppen und Gold

Lies die tatsächlichen Wirtschafts- und Wachstumsregeln der gewählten Version aus dem Code. Übernimm Bevölkerungslimit, Truppenwachstum, gegebenenfalls Arbeiterverteilung, Goldproduktion, Rundung und Zeitbasis unverändert.

Wenn die Zielversion einen Regler zwischen Truppen und Arbeitern besitzt, muss er mit seiner tatsächlichen Wirkung erhalten bleiben. Wenn sie eine andere Ressourcenlogik verwendet, übernimm diese. Füge keinen vermuteten Regler ein, nur weil eine fremde Anleitung ihn erwähnt.

Alle sichtbaren Werte stammen aus dem tatsächlichen Matchzustand. Truppen dürfen nicht für mehrere Aktionen gleichzeitig doppelt ausgegeben werden. Goldkosten und Einnahmen dürfen sich nicht beim erneuten Öffnen eines Fensters oder nach einem Verbindungsabbruch verdoppeln.

Die Zahlendarstellung, Wachstumsanzeigen, Tooltips und Ressourcenpanels sollen dem Original entsprechen. Wirtschaftliches Verhalten wird mit reproduzierbaren Spielsituationen gegen die ausgewählte Basis geprüft.

## 11. Gebäude und ihre Originalfunktionen

Erhalte sämtliche Gebäude der gewählten Version mit ihren echten Namen, Icons, Kosten, Platzierungsregeln, Stufen, Bauzeiten, Effekten und Kontextaktionen.

Zu prüfen sind insbesondere Städte, Verteidigungsposten, Häfen, Fabriken, Eisenbahninfrastruktur, Raketensilos und SAM-Stellungen. Diese Liste ist eine Prüfliste, kein Auftrag, fehlende Gebäude aus einer anderen Version beliebig dazuzuerfinden.

Die Bauvorschau muss erlaubte Positionen, Reichweiten und tatsächliche Kosten zeigen. Fertigstellung, Ausbau, Zerstörung und Übernahme wirken auf dieselben Simulationsobjekte, die auch auf der Karte dargestellt werden.

Bewahre die originalen Abhängigkeiten: Ein Hafen muss seine Küstenbedingungen erfüllen, Verteidigung betrifft den vorgesehenen Bereich und ein zerstörtes Wirtschaftsgebäude produziert nicht weiter. Noch nicht fertige Gebäude erhalten keine vorzeitigen Effekte.

## 12. Marine, Transporte und Kriegsschiffe

Übernimm Schiffsarten, Transportmechanik, Kosten, Geschwindigkeit, Wegfindung, Kampfverhalten und Landeregeln der verfügbaren Originalbasis.

Schiffe müssen tatsächlich über die Wasserkarte fahren. Truppentransporte binden reale Truppen und erzeugen nach ihrer Ankunft eine echte Landung. Kriegsschiffe greifen nach ihrer implementierten Reichweite und Zielwahl an.

Die Darstellung von Routen, Einheiten, Lebenspunkten und Auswahl folgt der Originaloberfläche. Zerstörte Schiffe verschwinden aus der Simulation und lösen die vorgesehenen Verluste aus.

Kein Schiff fährt durch Land. Ungültige Ziele, verlorene Häfen und unterbrochene Routen führen zu definiertem Originalverhalten oder einer klar dokumentierten technischen Korrektur. Eine Animation darf keinen nicht existierenden Transport vortäuschen.

## 13. Handel, Fabriken und Eisenbahn

Soweit die gewählte Version diese Systeme enthält, übernimm Seehandel, Handelspartner, Lieferungen, Fabriken, Eisenbahnen und Züge vollständig. Die offizielle aktuelle Funktionsübersicht nennt diese Bereiche; ihre Verfügbarkeit in einem älteren Fork muss separat geprüft werden.

Verwende die tatsächlichen Bau- und Verbindungsregeln. Züge und Frachter sind Simulationsobjekte mit realen Endpunkten, nicht lediglich bewegte Symbole. Einnahmen entstehen aus der vorhandenen Originalwirtschaft.

Krieg, verlorene Infrastruktur, zerstörte Transportmittel und Embargos beeinflussen den Handel nach den implementierten Regeln. Eine unterbrochene Route darf keine scheinbar erfolgreichen Lieferungen mehr verbuchen.

Wenn ein älterer Stand keine Eisenbahn enthält, wird das als konkrete Versionsabweichung ausgewiesen. Eine improvisierte Neuentwicklung darf nicht als übernommene Originalmechanik bezeichnet werden.

## 14. Diplomatie, Bündnisse und Unterstützung

Erhalte Bündnisanfragen, Annahme, Ablehnung, Kündigung, Friedenszeiten, Unterstützung und eventuelle Verrätereffekte nach den tatsächlichen Regeln der Basis.

Gold- und Truppenspenden müssen echte Ressourcen übertragen. Die Bedienelemente entsprechen dem Original und zeigen den tatsächlich gesendeten Betrag. Ein Vorgang wird pro bestätigter Aktion einmal verarbeitet.

Nationenbeziehungen beeinflussen erlaubte Angriffe und Handel wirklich. Die Anzeige «verbündet» darf nicht bloss kosmetisch sein. Teamzugehörigkeit und gewöhnliche Bündnisse bleiben entsprechend den vorhandenen Spielmodi unterscheidbar.

Übernimm Schnellnachrichten, Emotes, Pings und Ereignisanzeigen, soweit sie enthalten sind. Private Kommunikation erhält dieselben berechtigten Empfänger wie die zugehörige Beziehung.

## 15. Raketen und Raketenabwehr

Behalte die verfügbaren Spielwaffen bei, insbesondere Atombombe, Wasserstoffbombe, MIRV und die dazugehörige SAM-Abwehr, soweit sie in der gewählten Version vorhanden sind.

Übernimm Kosten, Produktion, Abklingzeit, Reichweite, Flugverlauf, Aufteilung, Abfanglogik, Einschlagswirkung und Darstellung aus der tatsächlichen Codebasis. Leite diese Werte nicht aus einem einzelnen Screenshot ab.

Raketen und Abfangvorgänge müssen in allen Clients denselben Zustand zeigen. Ein abgefangener Sprengkopf verursacht keinen zusätzlichen Einschlag. Eine Explosion verändert die vorgesehenen Gebäude, Truppen und Landflächen genau einmal.

Die Lobbyoption zum Ausschalten entsprechender Waffen muss die Aktionen auch in der Simulation sperren. Ein ausgeblendeter Button allein ist keine wirksame Spielregel.

## 16. Spielmodi und KI

Erhalte die Modi der Zielversion: beispielsweise freies Spiel, Teamvarianten, Einzelspieler, Menschen gegen KI sowie Classic-, Fast- und Chaos-Regeln, wenn diese tatsächlich vorhanden sind.

Gleiche Beschriftungen müssen gleiche Regeln auslösen. Ein Modus «Fast» darf nicht bloss den angezeigten Timer beschleunigen. Einstellungen wie keine Atomwaffen oder sofortiges Bauen müssen auf den echten Zustand wirken.

Verwende die originale KI. Bewahre Schwierigkeitsstufen, Nations-Bots und kleine Bots, soweit vorhanden. Füge keine zufällige Gegnerbewegung als Ersatz für eine existierende vollständige KI ein.

Einzelspieler ist sofort startbar. Bots werden transparent von menschlichen Teilnehmern unterschieden. Ein leeres eigenes Netzwerk darf nicht mit erfundenen menschlichen Spielern gefüllt werden.

## 17. Öffentliche und private Lobbys

Lobbys besitzen ihre tatsächlichen Raumcodes, Karten, Einstellungen, Teilnehmer und Startzustände. Einladungslinks müssen zur eigenen Domain und zum richtigen Raum führen.

Mehrere Browser sehen dieselbe Lobby. Namensänderungen, Beitritte, Teamwechsel, Bereitschaft und Start werden entsprechend dem vorhandenen Protokoll übertragen. Hostwechsel oder verlorene Verbindungen werden korrekt behandelt.

Öffentliche Spielsuche bezieht sich auf die eigenen wirklich existierenden Serverräume. Eine kleine eigene Instanz darf wenige oder keine offenen Partien besitzen. Zeige diesen Zustand ehrlich an und ermögliche private oder lokale Spiele.

Übernimm keine offiziellen globalen Spielerzahlen, Matchhistorien oder Ranglisten als angebliche Daten der eigenen Instanz.

## 18. Echter Mehrspielermodus und Backend

Betreibe die vom Projekt vorgesehene Netzwerkarchitektur. Prüfe vorher, ob die Simulation serverseitig, deterministisch verteilt oder nach einem anderen konkreten Modell arbeitet. Bewahre das funktionierende Modell, statt es ungeprüft umzubauen.

Der massgebliche Matchzustand muss für alle Teilnehmer konsistent sein. Clients dürfen sich keine Ressourcen oder Gebiete durch manipulierte Eingaben erzeugen. Befehle werden nach dem verwendeten Protokoll geprüft und geordnet.

Beitritt, laufende Updates, vollständiger Anfangszustand, Abbruch, Wiederverbindung und Spielende müssen über echte Verbindungen funktionieren. Zwei Tabs mit getrennten lokalen Simulationen sind kein Mehrspieler-Nachweis.

Verwende die passende Server-Laufzeit für langlebige Spielverbindungen. Ein rein statischer Host ersetzt keinen benötigten Spielserver. Ermittle reale Ports, Pfade und Proxy-Einstellungen aus dem Projekt und seiner Dokumentation.

## 19. Fremde Konten und optionale Dienste

Prüfe alle Integrationen für Anmeldung, Steam, Discord, Bezahlung, Werbung, Analyse, Rangliste und Fehlerberichte. Unterscheide, welche davon für die eigene Spielsimulation nötig sind und welche unabhängige Zusatzdienste sind.

Die eigene Instanz verwendet eigene Konfiguration und gegebenenfalls eigene Nutzerkonten. Ein lokales Konto ist nicht automatisch ein offizielles FrontWars-Konto. Erfinde keine Übernahme offizieller Käufe, Inventare oder Statistiken.

Wenn ein Zusatzdienst ohne Betreiberzugang nicht funktioniert, markiere die konkrete Einschränkung und halte die vorhandenen Gast- beziehungsweise Offlinepfade nutzbar. Ein ständiges fehlerhaftes Original-Login darf nicht den gesamten Einstieg blockieren.

Deaktiviere optionale Integrationen nur gezielt und dokumentiere den Unterschied zur Referenz. Keine pauschale Entfernung beliebiger Spielbereiche unter dem Vorwand des Selbsthostings.

## 20. Steuerung, Einstellungen und Sprache

Erhalte Maussteuerung, Rechtsklickmenü, Drag-Verhalten, Zoom, Hotkeys und vorhandene Touchbedienung. Übernimm die tatsächliche Standardbelegung aus der ausgewählten Version.

Ein kurzes Klicken darf nicht versehentlich als Kameraziehen gelten und umgekehrt. Zoomen soll dieselbe Zielposition berücksichtigen wie das Original. Bau- und Angriffsaktionen müssen auch nach Kamerabewegungen die richtige Stelle treffen.

Behalte Audio-, Grafik-, Spiel- und Spracheinstellungen, soweit die Basis sie enthält. Lade Übersetzungen vollständig. Stelle dieselben Texte und Begriffe dar und erfinde keine neue Terminologie.

Die Einstellungen bleiben über einen erneuten Besuch erhalten. Anpassungen für den eigenen Host dürfen keine gespeicherten Werte oder gültigen Spielkonfigurationen beschädigen.

## 21. Spielende, Statistik und Replays

Übernimm die Sieges- und Niederlageregeln der Version. Rate nicht, welche Landquote oder welches Zeitlimit gilt, sondern prüfe die tatsächliche Spielkonfiguration.

Ein Spiel endet für alle Teilnehmer gleich. Ergebnis, Platzierung und Statistik werden genau einmal gespeichert. Wiederholte Netzwerkereignisse dürfen keine zusätzlichen Siege erzeugen.

Enthält die gewählte Basis Replays, bewahre Aufnahme, Wiedergabe, Zeitsprung und Geschwindigkeitssteuerung. Die Wiedergabe muss die Originalpartie reproduzieren. Ein älterer Stand ohne Replayfunktion erhält eine konkrete Versionsnotiz.

Persistente Statistiken der eigenen Instanz beruhen nur auf tatsächlich dort gespielten Partien. Ein vorhandenes Original-Ranglistendesign kann erhalten bleiben, ohne fremde Resultate als eigene auszugeben.

## 22. Build, Abhängigkeiten und Start

Installiere nach Lockfile und Projektvorgaben. Verwende die passende Laufzeit, tatsächliche Skripte und vorhandene Buildstruktur. Erfinde keine Befehle, die das Repository gar nicht bereitstellt.

Dokumentiere, wie Client und Server lokal starten und wie die Produktionsfassung gebaut wird. Prüfe Worker, Kartenkomprimierung, Ressourcenverarbeitung und Serverstart tatsächlich.

Wenn Abhängigkeiten oder ältere Werkzeuge Probleme verursachen, behebe sie mit möglichst kleinen kompatiblen Änderungen. Ein umfassendes Upgrade mit veränderter Simulation ist für diesen Auftrag ungeeignet.

Sammle notwendige Einstellungen in einer Vorlage ohne Zugangsdaten. Alle erforderlichen Werte erhalten nachvollziehbare Namen und Erklärungen. Keine lokalen Rechnerpfade oder Entwicklungsadressen im fertigen Client.

## 23. Leistung erhalten

Erhalte die vorhandenen Optimierungen für Karten, Eigentumsänderungen, Einheiten, Worker und Netzwerk. Ersetze die Engine nicht durch hunderttausende DOM-Elemente oder eine vollständige Kartenneuberechnung pro Bild.

Prüfe Bildrate, Reaktionszeit, Speicher und Netzwerk unter realistischen Bedingungen. Eine leere Karte beweist nicht, dass eine grosse laufende Partie stabil bleibt.

Die konfigurierte Teilnehmergrenze richtet sich nach dem Projekt und den tatsächlich geprüften Serverressourcen. Versprich keine hunderte gleichzeitigen Spieler, wenn nur zwei Verbindungen getestet wurden.

Falls die Hostingumgebung begrenzt, benenne den konkreten Kapazitätsunterschied. Verändere nicht stillschweigend Spielgeschwindigkeit oder Regeln, um Last zu verstecken.

## 24. Visueller Vergleich

Vergleiche Hauptmenü, Einzelspielereinstellungen, Lobby, frühe Expansion, laufende Grosspartie, Radialmenü, Bauauswahl, Diplomatie und Ergebnisfenster mit der gewählten Referenzversion.

Nutze identische oder möglichst vergleichbare Bildschirmgrösse, Sprache, Karte, Zoom und Spielsituation. Prüfe Abstand, Grössen, Schrift, Transparenz, Hintergrund und Kartenfarben. Dynamische Namen, Zahlen und Zeitangaben dürfen bei einem Bildvergleich passend ausgeblendet werden.

Erstelle eine kurze Liste sichtbarer Abweichungen und behebe jede beeinflussbare Abweichung. Eine Ähnlichkeit des Farbthemas allein genügt nicht.

Die oben eingebundenen Originalbilder bleiben Teil der Übergabe. Eigene Prüfbilder werden eindeutig als Screenshots der eigenen Instanz bezeichnet. Generierte Bilder sind kein Beleg für eine funktionierende Oberfläche.

## 25. Funktionale Pflichtprüfung

Prüfe mindestens die folgenden vollständigen Abläufe mit der tatsächlich gestarteten Anwendung:

1. Hauptmenü lädt mit Karten, Schriften und Eingabeelementen ohne blockierende Fehler.
2. Einzelspieler startet und lässt sich bis zu einem echten Spielende spielen.
3. Neutrale Expansion, Truppenwachstum, Ressourcen und Gebäude funktionieren.
4. Ein echter Angriff erobert Gebiet mit den übernommenen Regeln.
5. Diplomatie und Ressourcenspenden verändern den gemeinsamen Spielzustand.
6. Eine Lobby lässt sich erstellen und über ihre eigene URL öffnen.
7. Zwei voneinander getrennte Browserkontexte treten derselben Partie bei und sehen dieselben Grenzen.
8. Beide können aktive Befehle ausführen; die Ergebnisse stimmen überein.
9. Die in der Version vorhandenen Schiffe, Landungen und Handelswege funktionieren.
10. Die vorhandenen Raketen und Abwehrmechaniken funktionieren mit echten Zustandsänderungen.
11. Browserrefresh und vorübergehender Verbindungsabbruch erhalten den richtigen Spielerplatz, soweit die Basis Wiederaufnahme unterstützt.
12. Die veröffentlichte Produktionsfassung funktioniert unter ihrer tatsächlichen Domain.

Führe die vorhandenen sinnvollen Tests des Projekts aus. Neue Prüfungen sollen konkrete Anpassungen und Risiken absichern. Behaupte keinen bestandenen Test, den du nicht durchgeführt hast.

## 26. Veröffentlichung

Veröffentliche die eigene Instanz mit funktionierender Verbindung zwischen Frontend und Backend. Nutze die für das Projekt verfügbaren Hostingdienste und gegebenenfalls den vorgesehenen Sites-Ablauf.

Prüfe die veröffentlichte URL als normaler Besucher. Eine alte Entwicklungssitzung, vorhandene Cookies oder ein lokaler Server dürfen keine Voraussetzung für den Erfolg des Tests sein.

Wenn ein notwendiger Backenddienst in der Umgebung nicht betrieben werden kann, liefere den vollständigen vorbereiteten Server und seine genaue Deploymentanleitung. Benenne die fehlende Verbindung konkret. Stelle einen vorhandenen funktionierenden Einzelspielerpfad bereit, ohne ihn als fertigen Onlinebetrieb auszugeben.

Berichte die normale Web-Erreichbarkeit, die du tatsächlich geprüft hast. Die Freigabe in einem Schulnetz kann nur dort festgestellt werden und wird nicht durch das Wort «unblocked» in einem Projektnamen nachgewiesen.

## 27. Quellcode und Versionsnachweis

Bewahre erforderliche Lizenztexte und Attributionen. Dokumentiere die konkret verwendete Quelle und den Commit sowie Änderungen für Hosting, Konfiguration und Fehlerbehebung. Richte erforderliche Quellcodeverweise nach der tatsächlich verwendeten Projektlizenz ein.

Liefere eine kurze Datei mit Version, Herkunft, Startbefehlen, benötigten Umgebungsvariablen, eigener Domain, geprüften Funktionen und bekannten Abweichungen zur Referenz.

Ermögliche einen Projekt- beziehungsweise ZIP-Export ohne Geheimnisse, private Nutzerdaten oder unnötige Abhängigkeitencaches. Enthalten sein sollen der ausführbare Projektcode, Konfigurationsvorlagen und die nötige Dokumentation.

## 28. Verbindliches Ergebnis und Arbeitsweise

Arbeite selbstständig von der Prüfung der Originalbasis über einen lauffähigen lokalen Stand bis zur überprüften Veröffentlichung. Frage nicht nach jedem gewöhnlichen Implementierungsschritt erneut, ob du fortfahren sollst.

Bewahre das Originalspiel so weit, wie es die tatsächlich verfügbare Basis ermöglicht. Ergänze keine neue Marke, kein zusätzliches Wirtschaftssystem und keine von dir erfundenen Balancewerte. Halte alle notwendigen Abweichungen sichtbar fest.

Am Ende möchte ich den spielbaren Link, die genaue verwendete Version, einen überprüfbaren Funktionsstand und den vollständigen Projektstand erhalten. Wenn eine aktuelle identische FrontWars-Fassung technisch nicht verfügbar ist, sage genau das und benenne den tatsächlich gelieferten Stand.

Beginne jetzt mit der Prüfung der vorhandenen Originalquellen und führe die Umsetzung bis zum tatsächlich erreichbaren Ergebnis durch.
