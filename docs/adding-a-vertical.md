# Adding a new vertical

This app supports reskinning the same running platform for different industry
verticals (Retail, BFSI, Telco, Utility, HighTech, Media, Manufacturing) without
forking the codebase. Each vertical is a **brand pack**: naming, copy, accent
colors, imagery and a product catalog -- it never changes service behavior or
page flow.

Six verticals (`bfsi`, `telco`, `utility`, `hightech`, `media`, `manufacturing`)
already exist as working stubs with a placeholder brand, a 2-3 row "coming
soon" catalog, and placeholder imagery, so the app boots cleanly on any of
them today. `retail` is the first fully built-out vertical. Use it as the
reference implementation when filling in a stub.

## What switches live vs. what needs a restart

- **Brand/theme/copy** switch **live**, with no rebuild or redeploy: they're
  driven by the `currentVertical` flagd flag (`src/flagd/demo.flagd.json`),
  readable/changeable from the `flagd-ui` service.
- **Product catalog and image set** are set per deploy via the `VERTICAL` env
  var (root `.env` / `.env.override`) and require recreating the
  `astronomy-db` and `image-provider` containers to take effect, since they
  come from files mounted/copied at container start.

## Steps to flesh out an existing stub vertical (e.g. `bfsi`)

1. **Brand config** -- edit `src/frontend/verticals/bfsi.ts` (already exists):
   update `brandName`, `tagline`, `heroCta`, `footerTagline`, `categoryLabel`,
   and `colors` if you want a different accent. This is a `VerticalConfig`
   (see `src/frontend/verticals/types.ts`); no other frontend file needs to
   change for a cosmetic-only update.

2. **Imagery** -- replace the files in
   `src/image-provider/static-src/bfsi/` with real assets:
   - `logo.svg` (or swap to `.png`/`.jpg` and update `logoFile` in the config)
   - `banner.svg` -- hero banner shown behind the tagline
   - `products/*.svg` -- one image per catalog row, filename must match the
     `picture` column in the seed file below

3. **Product catalog** -- edit
   `src/postgresql/seeds/bfsi/init.sql`: keep the schema/user/grant
   boilerplate at the top untouched, replace the `INSERT INTO catalog.products`
   rows with real data. `picture` must match a filename under
   `static-src/bfsi/products/`.

4. **Try it locally**:
   ```
   # in .env.override
   VERTICAL=bfsi
   ```
   ```
   docker compose up --force-recreate --detach astronomy-db image-provider frontend
   ```
   Then open the storefront and confirm the catalog, imagery and branding all
   match.

5. **Optional**: flip the `currentVertical` flagd flag to `bfsi` from
   `flagd-ui` while `VERTICAL` is still set to something else, to see the
   live re-theme in isolation from the catalog swap.

## Adding a brand-new vertical from scratch

Follow the same four steps above, but first:

- Add a new `src/frontend/verticals/<id>.ts` implementing `VerticalConfig`,
  and register it in `src/frontend/verticals/index.ts`.
- Add a `<id>` variant to the `currentVertical` flag in
  `src/flagd/demo.flagd.json`.
- Create `src/image-provider/static-src/<id>/` and
  `src/postgresql/seeds/<id>/` following the structure of any existing
  vertical.
