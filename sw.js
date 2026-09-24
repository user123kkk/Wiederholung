/* Service Worker für Adrabic-Wiederholung
   Ziel: die App-Hülle (index.html + Firebase-SDK + Quran-Schrift) zwischenspeichern,
   damit die App auch ohne Internet startet. Echte Firebase-/Google-API-Aufrufe
   (Login, Firestore-Sync) werden NICHT angefasst – dafür sorgt Firebase selbst
   mit seinem eigenen Offline-Cache.

   WICHTIG: Bei jeder neuen Version CACHE_NAME hochzählen (v2 → v3 → ...),
   sonst behalten Nutzer:innen alte Dateien im Cache. */

const CACHE_NAME = "adrabic-3.17.1";

/* 3.11.0: die Versionsnummer EINMAL, abgeleitet aus CACHE_NAME. Sie wird
   unten an styles.css und app.js gehaengt - siehe die Begruendung dort. */
const VERSION = CACHE_NAME.replace("adrabic-", "");

/* 3.0.0: Gestaltung und Ablauf liegen jetzt in eigenen Dateien neben der
   index.html. Beide MUESSEN hier stehen - sonst startet die App offline zwar,
   steht aber ohne Aussehen und ohne Funktion da.

   3.11.0, echter Fund beim Hochzaehlen auf diese Version:

   1. `"./app.js"` stand hier OHNE Versions-Query, waehrend index.html seit
      3.9.5 `./app.js?v=…` anfordert. Das sind zwei verschiedene URLs, und
      caches.match() vergleicht die ganze URL samt Query. Der Eintrag aus dem
      Vorabspeichern wurde also NIE getroffen - offline lief die App nur
      deshalb, weil der fetch-Handler weiter unten jede erfolgreiche Antwort
      unter ihrer echten URL nachtraegt. Ein Vorabspeichern, das nichts
      vorab speichert, ist aber kein Vorabspeichern.
   2. styles.css hatte ueberhaupt keine Versions-Query - dieselbe Falle, die
      README.md fuer app.js beschreibt (Cache-Control: max-age=3600 auf alle
      .js- und .css-Dateien, siehe firebase.json). Der fetch-Handler holt mit
      cache: "no-store" am Browser-Cache vorbei, aber nur fuer Seiten, die
      dieser Service Worker schon steuert; beim allerersten Laden nach einer
      Registrierung ist das nicht der Fall.

   Beides haengt jetzt an VERSION und wird mit CACHE_NAME zusammen einmal
   hochgezaehlt, statt an drei Stellen von Hand. */
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=" + VERSION,
  "./app.js?v=" + VERSION,
  "./manifest.json",
  "./icon.svg",
  "./desktop-icon.png",
  "./flower-isolated.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png"
];

/* Fremde Server, deren Dateien die App zum Starten braucht.
   Sie werden beim ersten Online-Besuch automatisch mitgespeichert
   (siehe fetch-Handler weiter unten). */
const CACHEABLE_ORIGINS = [
  "https://www.gstatic.com",            // Firebase-SDK
  "https://verses.quran.foundation"     // Quran-Schrift (UthmanicHafs)
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      /* Einzeln statt addAll: Wenn eine Datei fehlt (z.B. manifest.json),
         schlägt sonst der GESAMTE Vorgang fehl und es wird gar nichts
         zwischengespeichert – still und unbemerkt. */
      Promise.all(APP_SHELL.map(url =>
        cache.add(url).catch(() => {
          console.warn("[SW] Konnte nicht zwischenspeichern:", url);
        })
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Wie lange eine Datei aufs Netz warten darf, bevor der Cache einspringt. */
const NETZ_ZEITLIMIT_MS = 4000;

function isCacheable(url) {
  return url.origin === self.location.origin || CACHEABLE_ORIGINS.includes(url.origin);
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;      // Schreibvorgänge unangetastet lassen

  const url = new URL(req.url);
  if (!isCacheable(url)) return;         // Auth-/Firestore-Aufrufe durchreichen

  /* Zuerst Netz, dann Cache: online sieht man immer sofort die neueste
     Version, offline greift die zuletzt gespeicherte.

     3.0.23: Das Netz-Fetch fragt bewusst mit cache: "no-store" - also am
     eigenen HTTP-Cache des Browsers vorbei, nicht nur am Service-Worker-
     Cache. Ohne das galt: Schlug ein Abruf einmal fehl (kurzer Aussetzer
     beim CDN, Firmen-Proxy, o.ä.), legte der Browser diese Fehlantwort
     manchmal selbst in seinen HTTP-Cache - und jeder weitere normale
     Reload bediente sich wieder aus genau diesem Cache, ohne das Netz
     erneut zu fragen. Sichtbar wurde das als Adrabic, das dauerhaft mit
     "Start fehlgeschlagen" haengenblieb, obwohl das Netz laengst wieder
     ging - nur ein Hard-Reload (Strg+Umschalt+R) umgeht diesen
     Browser-Cache von sich aus und hat deshalb geholfen. Mit no-store
     fragt jeder Versuch wirklich das Netz, nicht einen alten Fehler.

     Nur fuer NICHT-Navigations-Anfragen (Skripte, Schriften) - ein Request
     mit mode "navigate" (der Seitenaufruf selbst) laesst sich so nicht neu
     bauen (der Modus wuerde dabei stillschweigend auf "same-origin"
     kippen), und dieser Pfad ist bereits getestet. */
  const netzAnfrage = req.mode === "navigate" ? req : new Request(req, { cache: "no-store" });
  event.respondWith((async () => {
    /* 3.6.13: Zeitlimit. Vorher wartete jede Datei so lange aufs Netz, wie der
       Browser eben wartet - bei schwachem Empfang ("Lie-Fi", Verbindung da,
       aber nichts kommt an) blieb die App am Ladekreisel haengen, obwohl alles
       im Cache lag. Antwortet das Netz nicht binnen NETZ_ZEITLIMIT_MS und
       liegt die Datei im Cache, gilt der Cache; die Netz-Antwort wird trotzdem
       abgewartet und aktualisiert ihn fuer den naechsten Start. */
    const netz = fetch(netzAnfrage).then(res => {
      /* Nur eine ECHTE Antwort landet im eigenen Cache - eine 404/500
         dort abzulegen wuerde denselben Fehler einbauen, den no-store
         gerade am Browser-Cache vorbei vermeidet. */
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
      }
      return res;
    });
    const netzOderNichts = netz.catch(() => null);
    event.waitUntil(netzOderNichts);
    const zeitlimit = new Promise(ok => setTimeout(() => ok(undefined), NETZ_ZEITLIMIT_MS));
    const erste = await Promise.race([netzOderNichts, zeitlimit]);
    if (erste) return erste;                       // Netz war rechtzeitig da
    const cached = await caches.match(req);
    if (cached) return cached;                     // Netz fehlt oder ist zu langsam
    if (erste === undefined) {                     // zu langsam, aber kein Cache: weiter warten
      const spaet = await netzOderNichts;
      if (spaet) return spaet;
    }
    /* Nur beim Aufruf der Seite selbst auf index.html ausweichen.
       Früher galt das für JEDE fehlgeschlagene Anfrage – dann bekam
       der Browser für eine fehlende JavaScript-Datei HTML zurück und
       stürzte mit einem unverständlichen Syntaxfehler ab. */
    if (req.mode === "navigate") {
      const index = await caches.match("./index.html");
      if (index) return index;
    }
    return Response.error();
  })());
});
