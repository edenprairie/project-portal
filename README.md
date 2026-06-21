# Jun Wang Project Portal

A static single-page portal for `project.junwang.us`.

## Edit Projects

Project content lives in `script.js` in the `projects` array. Add or update:

- `name`
- `system`
- `url`
- `category`
- `status`
- `description`
- `tags`

Use project-level statuses such as `Live`, `In progress`, `Protected`, or `Private`.

## Local Preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Hosting

This can be deployed as a static site on Cloudflare Pages, Vercel, Netlify, GitHub Pages, or any web server. The intended hostname is:

```text
project.junwang.us
```

## GitHub Actions Deploy

The repository includes `.github/workflows/deploy-cloudflare-pages.yml`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The workflow deploys the static site root to the Cloudflare Pages project:

```text
project-junwang-us
```
