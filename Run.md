# Wie Sie Promato starten

In diesem Dokument beschreiben wir kurz, wie Sie das Projektmanagementtool für Hochschulen
erfolgreich **auf ihrem Entwicklungsrechner** starten.

## Schritt 1: Starten der Datenbank 
1. Installieren Sie mySQl-installer-community-8.0.22
2. Starten Sie das Programm über die Eingabeaufforderung ihres Rechners
3. Erstellen Sie mit der Datei```/mysql/database_dump.sql``` eine Datenbank mit ihren Daten

## Schritt 2: Starten des Backends
1. Laden sie ihren Code in PyCharm und markieren Sie den src Ordner im backend als 
2. Starten sie die main.py mit dem src Directory als src Sources Root in PyCharm. Achten Sie dabei auf die 
Meldung in der Konsole, dort erscheinen entsprechende Meldungen, wenn der Start erfolgt.

**Anmerkung** 
In der Konsole erscheint ein Link für gewöhnlich ***[ Base URL: / ]http://127.0.0.1:5000   swagger.json ***
über den Sie Zugriff auf Funktionen der Projektverwaltung erhalten. Hier erhalten Sie einen Überblick über alle Funktionen des Backends und können diese Testen. Im Reiter Models erhalten Sie einen Überblick über die Klassen des Backends, deren Attribute und die Datentypen der Attribute.

## Schritt 2: Starten des Frontends
1. Stellens Sie sicher, dass sie im Verzeichnis `/frontend`der Quellcode des Haupt-Clients befindet. Wie Sie die spezifische Vorbereitung treffen, wird in dem [Dokument Installation.md] (Installation.md) erläutert.
2. Öffnen Sie das Verzeichnis `/frontend` per rechtsklick ***Open in Intigrated Terminal*** in einem neuen Terminal. 
3. Im Terminal (powershell) starten Sie das Frontend durch den Befehl ***npm start*** 

***Anmerkung***
Ihre ReactApp startet das Frontend dadurch auf dem ***https://localhost:3000*** in ihrem Browser. Falls das Starten schon einmal erfolgt ist und erneut der Befehl ***npm start *** im Verzeichnis `/frontend` ausgeführt wird. 
Gibt ihnen das Terminal den Hinweis ***? Something is already running on port 3000.*** aus. Möchten Sie die App dann auf einem anderen Port starten bestätigen Sie die Frage: ***Would you like to run the app on another port instead? » (Y/n)*** mit der Eingabe der Y-Taste. Die App startet nun den development Server auff dem Port: ***http://localhost:3001***. Falls Sie die Abfrage durch die Eingabe der N-Taste ausführen bricht der Startprozess ab. Im Browser bleibt die aktuelle Seite auf der Sie sich zum Zeitpunkt des Ausführens befinden geöffnet. 