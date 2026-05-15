# 📅 Planner PWA

Aplicație de planificare personală — PWA (Progressive Web App) cu notificări native pe telefon.

## ✨ Funcționalități

- **Timeline zilnic** — vizualizare orar a activităților
- **Calendar** — vedere lunară cu indicatori de ocupare
- **Notițe** — note rapide colorate
- **Activități Default** — activități recurente săptămânale
- **Alerte** — notificări native în bara de notificări a telefonului
- **Offline** — funcționează fără internet după prima încărcare

## 📱 Instalare pe telefon

1. Deschide site-ul în **Chrome** (Android) sau **Safari** (iPhone)
2. Apasă **"Adaugă pe ecranul de start"** / **"Add to Home Screen"**
3. Acceptă permisiunea pentru notificări
4. Gata! Aplicația se comportă ca o aplicație nativă

## 🔔 Notificări

- Notificările apar în bara de notificări a telefonului
- Funcționează chiar dacă browserul este în background
- **Notă:** Pentru notificări când aplicația este complet închisă, este nevoie de un server Push (vezi mai jos)

## 🗂️ Structura proiectului

```
planner-pwa/
├── index.html       # Aplicația principală
├── manifest.json    # Configurare PWA
├── sw.js            # Service Worker (cache + notificări)
└── icons/           # Iconuri pentru toate dispozitivele
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

## 🚀 Deploy pe GitHub Pages

1. Creează un repository nou pe GitHub
2. Încarcă toate fișierele (inclusiv folderul `icons/`)
3. Mergi la **Settings → Pages**
4. Selectează branch `main` și folder `/root`
5. Apasă **Save** — site-ul va fi live la `https://username.github.io/repo-name`

> ⚠️ **Important:** GitHub Pages servește fișierele de pe `/` — asigură-te că `manifest.json` și `sw.js` sunt în rădăcina repository-ului, nu într-un subfolder.

## 🛠️ Tehnologii

- HTML5 / CSS3 / JavaScript vanilla
- Web Notifications API
- Service Worker API
- localStorage pentru persistența datelor
- PWA Manifest

## 📄 Licență

MIT
