# Installationsanleitung

## Clients
Die Clients bauen auf einem React-Frontend auf, welches mit create-react-app gebootstrapt wurde. Der Quellcode des Haupt-Clients liegt im Verzeichnis 
`/frontend`.

### Vorbereitung
1. Node.js (siehe https://nodejs.org/) 
2. Package-dependencies:

Vor dem Start müssen im Terminal über das Kommando `npm install` die Dependencies installiert werden. 
Folgende Abhängigkeiten müssen für beide Clients installiert werden:

- [React Router-Dom](https://reacttraining.com/react-router/web/guides/quick-start)
  - `npm install --save react-router-dom`
- [Material-UI](https://material-ui.com)
  - `npm install @material-ui/core`
  - `npm install @material-ui/lab`
  - `npm install @material-ui/icons`
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)
  - `npm install --save firebase`

### Wie wird der React-Server gestartet?
React bringt einen eigenen Echzeit Development-Server mit.

Dieser wird in einem Terminal mit dem Kommando 
`npm start` gestartet.
Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.

## Server/Service-Seite
Die Server-Seite baut auf Python, Flask, sowie RestX auf.

### Was wird vorab benötigt?
1. Python (Version 3.7 oder höher)
2. Flask (inkl. *Jinja* und *Werkzeug*)
3. flask-cors 
4. flask-restx
5. google-auth
6. requests


Die benötigten Packages können unter dem Befehl 
```pip install -r src/requirements.txt``` installiert werden.