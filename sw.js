/* Service Worker für Adrabic-Wiederholung
   Ziel: die App-Hülle (index.html + Firebase-SDK + Quran-Schrift) zwischenspeichern,
   damit die App auch ohne Internet startet. Echte Firebase-/Google-API-Aufrufe
   (Login, Firestore-Sync) werden NICHT angefasst – dafür sorgt Firebase selbst
   mit seinem eigenen Offline-Cache.

   WICHTIG: Bei jeder neuen Version CACHE_NAME hochzählen (v2 → v3 → ...),
   sonst behalten Nutzer:innen alte Dateien im Cache. */

const CACHE_NAME = "adrabic-3.0.18";

/* 3.0.0: Gestaltung und Ablauf liegen jetzt in eigenen Dateien neben der
   index.html. Beide MUESSEN hier stehen - sonst startet die App offline zwar,
   steht aber ohne Aussehen und ohne Funktion da. */
const APP_SHELL = [
  "./",
  "./landing.html",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  "./desktop-icon.png",
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

function isCacheable(url) {
  return url.origin === self.location.origin || CACHEABLE_ORIGINS.includes(url.origin);
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;      // Schreibvorgänge unangetastet lassen

  const url = new URL(req.url);
  if (!isCacheable(url)) return;         // Auth-/Firestore-Aufrufe durchreichen

  /* Zuerst Netz, dann Cache: online sieht man immer sofort die neueste
     Version, offline greift die zuletzt gespeicherte. */
  event.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then(cached => {
          if (cached) return cached;
          /* Nur beim Aufruf der Seite selbst auf index.html ausweichen.
             Früher galt das für JEDE fehlgeschlagene Anfrage – dann bekam
             der Browser für eine fehlende JavaScript-Datei HTML zurück und
             stürzte mit einem unverständlichen Syntaxfehler ab. */
          if (req.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        })
      )
  );
});
