# ZONEOUT_CUSTOM

Website for **Zoneout Customs** (custom motorcycle builds and modifications) and its sister business
**Smart Fleet Tech** (GPS installation, AIS-140, fleet tracking, Coimbatore).

Built with React 19, Vite 7, React Router, and Framer Motion.

## Run it

```
npm install
npm run dev       # http://localhost:5173
npm run build     # production files in dist/
npm run preview   # serve the build locally
```

## Pages

`/` home · `/services` · `/gallery` · `/videos` · `/about` · `/contact` · `/smart-fleet`

## Content

- Shop details, services, FAQ, nav: `src/data/site.js`
- Smart Fleet Tech details: `src/data/fleet.js`
- Photos and videos (including importing from Instagram): see [MEDIA.md](MEDIA.md)

## Deploying

Upload the contents of `dist/`. `public/.htaccess` (Apache / Hostinger) and `public/_redirects`
(Netlify) make page URLs like `/gallery` work on refresh.
