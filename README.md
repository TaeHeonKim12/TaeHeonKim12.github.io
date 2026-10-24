# Taeheon Kim — Academic Website

A plain HTML/CSS/JavaScript academic website for GitHub Pages. No framework, package installation, build step, backend, external API, or analytics service is required. All fonts are local system fonts.

## Files

- `index.html`: biography, research interests, featured research and projects
- `research.html`: working papers and research in progress
- `projects.html`: catalog generated from `projects.json`
- `cv.html`: CV overview and PDF links
- `contact.html`: email, GitHub, affiliation
- `research/krx-disclosure.html`: research overview (not a published-paper claim)
- `projects/`: standalone reports or clearly marked overview placeholders
- `assets/cv.pdf`: the existing CV review draft
- `assets/css/site.css`: the shared design system
- `assets/js/site.js`: GitHub URL and project-card rendering
- `.nojekyll`: disables Jekyll processing; keep this file in the repository

## Publish on GitHub Pages

1. Create a **public** repository named `TaeHeonKim12.github.io` in the `TaeHeonKim12` account. This is the verified account; do not use `taeheonkim.github.io` unless that is an account you own.
2. Upload this folder's **contents**, including its subfolders, to the repository root. `index.html` and `projects.json` must be at the top level. Upload the extracted files, not the ZIP itself.
3. Commit the files to `main`.
4. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
5. Wait for GitHub's deployment to finish. The intended URL is `https://taeheonkim12.github.io/`. Check Settings → Pages for the deployed URL and status.

A project repository also works because links are relative. If you use a repository such as `academic-website`, the address becomes `https://taeheonkim12.github.io/academic-website/`.

Official instructions: https://docs.github.com/en/pages/quickstart

## Add a project — no programming or analysis rerun

1. Export the completed report from your existing analysis tool.
2. Upload the HTML to `projects/`, for example `projects/new-study.html`.
3. Edit `projects.json` on GitHub and append an object to the array:

```json
{
  "id": "new-study",
  "title": "Your Project Title",
  "description": "A short, factual summary of the question and work.",
  "methods": ["Asset pricing", "Panel regressions"],
  "status": "Research report",
  "featured": false,
  "url": "projects/new-study.html",
  "pdf": null,
  "github": null
}
```

4. Commit. After GitHub Pages redeploys, the card appears automatically.

Use double quotes, add commas between objects, and do not put a trailing comma after the last object. `id` should be unique. Set `featured` to `true` to show an entry on Home as well. Array order determines card order. `pdf` can be a relative PDF path or an HTTPS URL; `github` can be a repository HTTPS URL. Leave absent links as `null`. The website does not scan the folder: only entries in this JSON file appear.

### Replace or rename a report

- To update a report, replace its HTML at the **same path**. Nothing else needs to change.
- To rename it, upload the new filename and change `url` in its JSON entry.
- The five initial report files are explicitly labeled overview placeholders. Replace them with your finished reports; do not leave the old “Report forthcoming” or “Planned entry” status after publishing a completed report.
- Report links open in a separate tab. Reports are not embedded in an iframe, rewritten, or injected into the website layout. Their own CSS, scripts, tables, figures, and table of contents remain intact.

## Quarto report resources

Prefer a self-contained report when exporting from Quarto:

```yaml
format:
  html:
    embed-resources: true
```

This is an instruction for preparing the report in your existing workflow, not a build requirement for this website. The website never runs R or Python or loads your analysis data.

For an existing report that is not self-contained, upload its companion folders too (for example `report_files/`, `site_libs/`, images and media). Preserve their relative locations. For a multi-page report, upload its whole directory under `projects/my-report/` and point `url` to `projects/my-report/index.html`. External scripts and remote assets still require those resources to be available; self-contained export may not include every dynamic or remote resource. Avoid filename collisions when reports share library-folder names. Paths on GitHub Pages are case-sensitive.

## CV updates

Replace `assets/cv.pdf` with the newest approved PDF, keeping the filename. Both Open and Download links immediately point to that file after deployment. The current file is the existing **review draft**, labeled accordingly on `cv.html`. Remove that one-line draft note once a final CV replaces it. The short web CV summary is deliberately static; update its text if your education or experience changes. It is not parsed from the PDF.

## Research updates

Edit `research.html` to add entries under Working Papers or Research in Progress. A detail page can be placed in `research/`. The existing KRX overview has sections for abstract, methods, findings and manuscript materials. Upload a PDF and add a relative link when it is ready. Do not label unpublished work as published; add coauthors and status only when confirmed.

## Profile updates

Edit the plain HTML for biography and contact details. The GitHub profile is set once in `assets/js/site.js`. Navigation is deliberately static HTML in each page for accessibility and reliable links without JavaScript. If you change the menu, update the five main pages and any retained overview pages.

## Local preview and troubleshooting

The ordinary pages open directly from disk, but browsers commonly block `fetch()` of JSON on `file://` URLs. Use GitHub Pages to see the automatic project cards, or optionally preview locally with `python -m http.server 8765` from this folder and visit `http://localhost:8765/`. This optional preview command is **not** required for maintenance or deployment.

If cards fail to load, inspect `projects.json` for invalid JSON and confirm it is next to `projects.html`. If a report returns 404, check spelling, capitalization and the uploaded companion files. The catalog handles failures with a visible message instead of leaving a blank page. No content from JSON is inserted as raw HTML.

## Current content and publication state

The biography and confirmed research descriptions are based on the existing academic CV. Trading strategy and data engineering entries are explicitly planned placeholders. No unverified returns, publication records, coauthors or awards were added. The initial CV is a review draft. The site has no tracking, contact form, accounts, or external data connection.
