# DGX Heizungsaufnahme

Web-App für die Vor-Ort-Aufnahme für Heizlastberechnung und hydraulischen Abgleich, optimiert für Handys (iOS und Android).

Ablauf: Objekt → Wohneinheit → Raum → Heizkörper (Maße, Typ, Fotos, Thermostatventil) → weiterer Heizkörper / nächster Raum / Wohneinheit abschließen → Übersicht → **ZIP-Datei** mit Excel-Tabelle, Fotos, Plänen und Zusammenfassung, die anschließend an info@dgx.eco geschickt wird.

- Alle Eingaben und Fotos bleiben nur auf dem Gerät gespeichert (localStorage / IndexedDB), es gibt keinen Server.
- Nach dem ersten Öffnen läuft die App auch offline (Service Worker).
- Auf dem Handy über „Zum Home-Bildschirm“ wie eine App installierbar. Auf dem iPhone empfohlen, weil Safari Daten von nicht installierten Websites nach längerer Nichtnutzung löschen kann.

## Veröffentlichen mit GitHub Pages

1. Repository auf GitHub anlegen und alle Dateien hochladen (`index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, `lib/`).
2. Unter **Settings → Pages**: Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Nach ca. einer Minute ist die App unter `https://<benutzer>.github.io/<repo>/` erreichbar.

Kamera, Offline-Betrieb und Installation brauchen HTTPS. Das stellt GitHub Pages automatisch bereit.

**Updates:** Nach Änderungen in `sw.js` die Versionsnummer bei `CACHE` erhöhen (z. B. `dgx-aufnahme-v3`), damit alle Geräte die neue Version laden.

## Anpassen

Auswahllisten (Räume, Heizkörpertypen, Ventilhersteller/-modelle, Dimensionen, Rohrmaterial) stehen oben in `index.html` unter „Stammdaten“.

## Lokal testen

```bash
python3 -m http.server 8791
```

Danach http://localhost:8791 öffnen.
