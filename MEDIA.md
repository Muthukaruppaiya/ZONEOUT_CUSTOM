# Adding photos and videos

The Gallery, Videos page, home "Fresh off the bench" grid and the hero video all read from
`src/data/gallery.json`. Until it has items, the site shows stand-in stock photos.

## Option A: import everything from Instagram (recommended)

1. On the @zoneout_customs account, go to **Settings → Accounts Center → Your information and
   permissions → Download your information**.
2. Choose **Some of your information → Content (posts, reels)**, **Download to device**,
   format **JSON**, media quality **High**, date range **All time**.
3. When the email arrives, download the zip and unzip it.
4. Run:

   ```
   npm run gallery:import -- "C:/path/to/unzipped-export"
   ```

   Every post and reel is copied to `public/media/gallery/`, with its caption, date, and hashtags.
   Hashtags become the gallery filter options.

## Option B: drop files in by hand

Put `.jpg / .png / .webp / .mp4` files in `public/media/gallery/` and run `npm run gallery`.
A file named `2024-06-01-royal-enfield-bobber.jpg` gets the label "Royal Enfield Bobber".

## Tidying up

Edit `src/data/gallery.json` afterwards. Your edits are kept the next time you run the script:

- `label`: the short title on the tile
- `tags`: the filter options
- `featured: true`: shows the item first on the home page

`npm run build` re-scans the folder automatically.

**Size tip:** keep videos under about 8 MB each (720p is plenty). The newest video is also used
as the home page hero, so make sure it looks good muted and on a loop.

## Smart Fleet Tech media

The Smart Fleet Tech page (`/smart-fleet`) has its own set. Do the same Instagram export on the
**@smartfleettech** account, then run:

```
npm run fleet:import -- "C:/path/to/unzipped-export"
```

Or drop files into `public/media/fleet/` and run `npm run gallery`. Edit `src/data/fleet-gallery.json`
to tidy labels. Until it has items, the page shows a link to the Instagram profile instead of a grid.

Fill in the Smart Fleet Tech phone, WhatsApp, and email in `src/data/fleet.js`.
