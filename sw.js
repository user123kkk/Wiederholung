/* Service Worker für Adrabic-Wiederholung
   Ziel: die App-Hülle (index.html + Firebase-SDK + Quran-Schrift) zwischenspeichern,
   damit die App auch ohne Internet startet. Echte Firebase-/Google-API-Aufrufe
   (Login, Firestore-Sync) werden NICHT angefasst – dafür sorgt Firebase selbst
   mit seinem eigenen Offline-Cache.

   WICHTIG: Bei jeder neuen Version CACHE_NAME hochzählen (v2 → v3 → ...),
   sonst behalten Nutzer:innen alte Dateien im Cache. */

const CACHE_NAME = "adrabic-3.17.37";

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
/* 3.17.36 (G-068): KERN sind die Dateien, ohne die die App offline gar nicht
   laufen kann (leere Seite ohne HTML/Gestaltung/Logik). Fehlt eine davon beim
   Vorabspeichern, MUSS die ganze Installation scheitern - siehe install()
   weiter unten, wo genau deshalb kein .catch() mehr dabei ist. ZUSATZ sind
   Icons/Schriften: fehlen sie, sieht die App nur schlechter aus, startet aber
   noch - dafuer bleibt das Einzeln-mit-catch aus 3.0.0. */
const KERN = [
  "./",
  "./index.html",
  "./styles.css?v=" + VERSION,
  "./app.js?v=" + VERSION
];
const ZUSATZ = [
  "./manifest.json",
  "./desktop-icon.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./fonts/UthmanicHafs1Ver18.ttf"      // 3.17.24: Quran-Schrift, selbst ausgeliefert
];
const APP_SHELL = KERN.concat(ZUSATZ);

/* Fremde Server, deren Dateien die App zum Starten braucht.
   Sie werden beim ersten Online-Besuch automatisch mitgespeichert
   (siehe fetch-Handler weiter unten). */
const CACHEABLE_ORIGINS = [
  "https://www.gstatic.com"             // Firebase-SDK
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      /* 3.17.36 (G-068): KERN mit addAll OHNE catch - fehlt eine Kerndatei
         (z.B. app.js?v=… wegen eines Netzfehlers), MUSS die Installation
         scheitern. Vorher fing jede Datei ihren eigenen Fehler ab; damit
         gelang die Installation auch dann, wenn app.js gar nicht im Cache
         lag - der alte Worker samt altem Cache wurde in activate() trotzdem
         geloescht. Offline zeigte die neue index.html danach auf eine
         app.js, die nirgends lag: die App blieb am Ladebildschirm haengen,
         ohne jede Moeglichkeit, das zu reparieren. Scheitert addAll jetzt,
         bleibt der alte, funktionierende Worker samt Cache aktiv (siehe
         activate()), und der naechste Online-Besuch versucht es erneut.

         Einzeln statt addAll gilt nur noch fuer ZUSATZ: Fehlt dort eine
         Datei (z.B. ein Icon), soll die App trotzdem starten - nur mit
         schlechterer Optik statt gar nicht. */
      cache.addAll(KERN).then(() =>
        Promise.all(ZUSATZ.map(url =>
          cache.add(url).catch(() => {
            console.warn("[SW] Konnte nicht zwischenspeichern:", url);
          })
        ))
      )
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

/* 3.17.36 (G-029): Diese drei Faelle tragen ihre Version schon in der URL -
   eine neue Version ist immer eine neue URL, die alte URL liefert nie wieder
   etwas anderes als das, was gerade im Cache liegt. Die Begruendung von
   "Zuerst Netz" weiter unten ("online immer die neueste Version") gilt hier
   also nicht: die neueste Version bekommt man so oder so nur ueber eine neue
   URL (neue index.html mit neuem ?v=, siehe README-Veroeffentlichungsliste).
   Deshalb "Zuerst Cache, sonst Netz" - kein Zeitlimit-Warten auf ein Netz,
   das ohnehin nur dieselben Bytes liefern koennte, die schon da sind:

   1. eigene Herkunft mit Query-Parameter "v" (app.js?v=…, styles.css?v=…);
   2. https://www.gstatic.com/firebasejs/<Version>/… (Firebase-SDK - app.js
      haengt bei Wiederholungsversuchen zusaetzlich "?wiederholung=2" an,
      das faellt mit unter Fall 2 und ist beim ersten Mal noch nicht im
      Cache, geht dann also folgerichtig aufs Netz);
   3. eigene Herkunft unter /fonts/ (die Quran-Schrift).

   Alles andere (Navigationen, manifest.json, Bilder, Sonstiges) bleibt beim
   bisherigen "Zuerst Netz"-Pfad. */
const FIREBASEJS_VERSION_PFAD = /^\/firebasejs\/\d+[\w.-]*\//;
const SCHRIFTEN_PFAD = new URL("./fonts/", self.location).pathname;   // relativ zu sw.js, nicht fest "/fonts/"
function isUnveraenderlich(url) {
  if (url.origin === self.location.origin) {
    return url.searchParams.has("v") || url.pathname.startsWith(SCHRIFTEN_PFAD);
  }
  return url.origin === "https://www.gstatic.com" && FIREBASEJS_VERSION_PFAD.test(url.pathname);
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;      // Schreibvorgänge unangetastet lassen

  const url = new URL(req.url);
  if (!isCacheable(url)) return;         // Auth-/Firestore-Aufrufe durchreichen

  if (isUnveraenderlich(url)) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;                     // Cache zuerst
      const res = await fetch(new Request(req, { cache: "no-store" }));
      /* Nur eine ECHTE Antwort landet im eigenen Cache - siehe Begruendung
         bei 3.0.23 weiter unten. */
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
      }
      return res;
    })());
    return;
  }

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
