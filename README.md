# Able-Tach-Website

Copyright © 2026 Aai. All rights reserved. This document may be reproduced and distributed verbatim and in full only alongside copies of the GPL-3.0-only-covered program code, for the limited purpose of explaining the project and its licensing scope. This permission does not allow modification or standalone distribution of this document and does not add conditions to the GPL-covered code.

[简体中文](README.zh-CN.md) | **English**

**Tianyuan Research Institute · 田园研究所**

**Public copyright attribution:** Aai (the creator's pen name)

*Aai is the creator's public pen name and public copyright attribution, not a separate legal entity. Tianyuan Research Institute (田园研究所) is the website name only.*

**Research · Reading · Reflection**

Able-Tach-Website is the source repository for Tianyuan Research Institute, an academic-themed static website dedicated to exploring astronomy, biology, and related fields of knowledge.

The project combines a clean academic design with research-oriented pages, articles, and creative works. It provides a simple, adaptable framework for presenting research materials and ideas on the web.

**Repository:** [Aaibili/Able-Tach-Website](https://github.com/Aaibili/Able-Tach-Website)

**Licensing:** Original website program code is GPL-3.0-only within the scope listed in [`LICENSE-SCOPE.md`](LICENSE-SCOPE.md). Articles, images, branding, and visitor-facing site content are not automatically included in that code license; see [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md).

> **Disclaimer:** As of 2026-11-07, all currently published creative works on the website—including articles, research reports, theoretical models, fictional people and institutions, events, and related visual materials—are fictional. Future real-world educational materials or genuine research will be clearly identified on the relevant page and, where appropriate, accompanied by sources, authors, and publication or review dates. Operational notices, legal notices, and licensing information are not fictional works.

## Features

- **Static website architecture** — Simple deployment without requiring a dedicated application server or database.
- **Academic-inspired design** — A restrained visual style for presenting research and written materials.
- **Responsive layout** — Designed to adapt to desktop and mobile screens.
- **Research and publications section** — Dedicated pages for articles, research reports, and other works.
- **Reusable page templates** — A foundation for creating additional research-oriented pages.
- **Disclaimer support** — Space for presenting important notices and content limitations.

Features may vary depending on the current state of the project.

## Project Structure

The directory structure may evolve as the project develops. A typical layout may look like this:

```text
Able-Tach-Website/
├── .github/
│   └── workflows/
├── assets/
│   ├── css/
│   │   ├── article-pages/
│   │   └── homepage.css
│   └── js/
├── images/
├── site-content/
├── page-layouts/
├── Papers and Achievements/
│   ├── article-content/
│   └── articles.json
├── generate_article_pages.py
├── generate_papers_manifest.py
├── index.html
├── LICENSE
├── LICENSE-SCOPE.md
├── CONTENT-LICENSE.md
├── ASSET-SOURCES.md
├── README.md
└── README.zh-CN.md
```

This is an illustrative structure, not a definitive listing of the repository's current files. Refer to the actual repository for the latest structure.

## Getting Started

### Run Locally

The homepage and article pages load visitor-facing copy and other content with browser `fetch()`. For a complete local preview, use an HTTP static server:

1. Clone or download this repository and open the project directory.
2. From the repository root, run:

   ```bash
   python -m http.server 8000
   ```

3. Open `http://localhost:8000/` in a modern web browser.

Do not open an individual article page through `file://`; the browser will block its runtime content requests.

### Clone the Repository

```bash
git clone https://github.com/Aaibili/Able-Tach-Website.git
cd Able-Tach-Website
```

### Deployment

As a static website, the project can generally be hosted using a static web hosting service or a web server capable of serving HTML, CSS, JavaScript, and image files.

Before publishing a deployment, review the applicable licenses for all included assets.

## Licensing

This project separates the licensing of source code from the permissions applicable to articles, images, branding, and other creative materials.

### Source Code

Only the original source-code files and components identified as GPL-covered in [`LICENSE-SCOPE.md`](LICENSE-SCOPE.md), or individually marked as covered by GPL-3.0-only, are licensed under the **GNU General Public License v3.0 (GPL-3.0-only)**.

The GPL grant covers the identified program code, not independent non-program wording intended for display to website visitors merely because it is embedded in or emitted by those files. Most site-wide copy and the disclaimer are stored separately in `site-content/`; article text and descriptions are stored in the article-content, metadata, and listing-description files. These are not included in the GPL-3.0-only grant. The surrounding program code remains covered as specified in `LICENSE-SCOPE.md`.

The presence of the root `LICENSE` file does not, by itself, mean that every file in this repository is licensed under GPL-3.0-only. Consult [`LICENSE-SCOPE.md`](LICENSE-SCOPE.md), file-level notices, and third-party license notices to determine the applicable terms.

For covered code, you may use, study, modify, and redistribute it in accordance with GPL-3.0-only. Distribution of covered modified versions must comply with the license's applicable conditions, including source-code and notice requirements.

See [`LICENSE`](LICENSE) for the complete license text.

Official license: https://www.gnu.org/licenses/gpl-3.0.html

### Articles, Research Materials, and Images

Unless an individual file or accompanying notice expressly states otherwise, original articles, research reports, theoretical models, illustrations, backgrounds, AI-generated images, and other creative materials are **not included in the GPL-3.0-only grant**.

No general permission to reproduce, modify, redistribute, publicly display, or commercially use these materials is granted merely because they are included in this public repository. Any rights and exceptions provided by applicable law remain unaffected.

Please consult [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md) and notices accompanying individual files before reusing such materials.

AI-generated materials may be subject to additional terms or limitations depending on the generation service, applicable law, and third-party rights. Their copyright status may vary.

### Name and Branding

The project name **Able-Tach-Website**, the website name **Tianyuan Research Institute (田园研究所)**, and associated logos, icons, and other identifying brand assets are not automatically licensed under GPL-3.0-only. Do not use them in a way that falsely implies official affiliation, endorsement, or authorization.

### Third-Party Materials

The current browser-facing site does not load externally hosted fonts, JavaScript libraries, CSS frameworks, or remote image assets. The GitHub Actions workflow references `actions/checkout@v4` and `actions/setup-python@v5`; these are third-party workflow dependencies, not website runtime dependencies. Their upstream repositories identify them as MIT-licensed. The source and status of the seven local image files are recorded in [`ASSET-SOURCES.md`](ASSET-SOURCES.md); their provenance is not fully documented and should be confirmed before reuse.

## Disclaimer

As of 2026-11-07, all currently published creative works on the website—including articles, research reports, theoretical models, fictional people and institutions, events, and related visual materials—are fictional. Operational notices, legal notices, and licensing information are not fictional works.

Future real-world educational materials or genuine research will be clearly identified on the relevant page and, where appropriate, accompanied by sources, authors, and publication or review dates.

Academic terms such as “paper,” “published,” “experiment,” or “professor” used within fictional works are part of the fictional setting. They do not imply actual publication, peer review, institutional certification, or experimentally verified results.

Fictional or hypothetical materials should not be treated as established scientific facts or professional advice. Content expressly labeled as real-world information should be checked against its cited sources and does not replace professional judgment.

The source code is distributed under its applicable license and subject to the warranty and liability provisions of that license.

## Content-Nature Labels

Article pages declare their content nature with a `content-nature` meta tag in the HTML `<head>`. Supported values are:

- `fictional` — Fictional creative work. This is the default when the tag is missing or invalid.
- `hypothetical` — Hypothetical research, reasoning, or models; not evidence of actual experiments or results.
- `reference` — Real-world reference material or sourced information.
- `research` — Work presented as real-world research. This label describes the page's claim; it is not independent verification or institutional endorsement.

The `generate_article_pages.py` script writes the `content-nature` meta tag from `Papers and Achievements/articles.json`. Keep the `contentNature` value in that file and the visible badge in the corresponding article-content fragment consistent. The `generate_papers_manifest.py` script writes the `papers.json` manifest; the shared page script reads that manifest at runtime to build the homepage list. Real-world reference material or research should also identify relevant sources, authors, methods, data, and dates where appropriate.

## Article Content and Page-Code Separation

Article pages are built from separate content and program-code sources:

- **Article text and markup:** `Papers and Achievements/article-content/*.html`. These are content fragments, not complete standalone pages.
- **Article metadata:** `Papers and Achievements/articles.json`. It maps each article ID to its published HTML filename, title, description, content-nature label, content fragment, and stylesheet.
- **Shared visitor-facing copy:** `site-content/site-copy.json` contains interface wording and `site-content/disclaimer.html` contains the disclaimer text. These are content files, not reusable page program code, and are excluded from the GPL-3.0-only grant.
- **Reusable page shell:** `page-layouts/article-page.html`.
- **Shared page behavior:** `assets/js/article-page.js` loads site copy and article content, validates fragments, manages the disclaimer gate, and initializes the homepage publication list.
- **Article stylesheets:** `assets/css/article-pages/`.
- **Published article pages:** the `.html` files in `Papers and Achievements/` are generated outputs. Edit the source fragment, metadata, template, or stylesheet instead of editing these outputs directly.

The article fragments contain article-specific HTML structure (such as headings, sections, tables, figures, captions, and fragment-level attributes) as well as the prose and references. In this project's licensing scheme, that markup belongs to the article content; it is not the reusable page framework. The shared page template, common JavaScript loader, Python generators, and listed CSS stylesheets perform the reusable layout, loading, validation, generation, and presentation functions and are covered by GPL-3.0-only to the extent stated in `LICENSE-SCOPE.md`. Article-fragment classes and data attributes may connect to shared styles or loader behavior, but that technical connection does not itself change the project's stated content/code boundary. This describes the intended license scope and does not resolve every legal question about combined HTML/CSS works.

To regenerate the published article pages and the homepage publication manifest, run these commands from the repository root, in this order:

```bash
python generate_article_pages.py
python generate_papers_manifest.py
```

The paired `.txt` files in `Papers and Achievements/` remain short descriptions used in the homepage list. Keep the visible content-nature badge inside each article fragment consistent with the `contentNature` value in `articles.json`.

The site loads its visitor-facing copy, disclaimer, article metadata, and article fragments at runtime. For local preview, use an HTTP static server from the repository root rather than opening the site through `file://`, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` in a browser.

## Contributing

Contributions to files explicitly identified as GPL-covered source code are welcome, subject to the applicable licensing requirements.

Before submitting a contribution, please ensure that:

- You have the right to contribute the code or materials.
- You identify any third-party assets and their applicable licenses.
- You do not include confidential information, credentials, or private data.
- You understand that contributions to GPL-covered code may be distributed under the project's GPL licensing terms.
- You clearly identify any contribution that is intended to have a different license.

Do not submit third-party images, articles, or other creative materials unless their use is properly authorized.

## Project Information

- **Repository:** [Aaibili/Able-Tach-Website](https://github.com/Aaibili/Able-Tach-Website)
- **Website Name:** Tianyuan Research Institute (田园研究所) — website name only
- **Public Copyright Attribution:** Aai (the creator's pen name)
- **Focus Areas:** Astronomy and Biology
- **Project Type:** Static Academic Website
- **Source Code License:** GNU GPL version 3 only (GPL-3.0-only), limited to the scope described in `LICENSE-SCOPE.md`
- **Asset Sources:** See `ASSET-SOURCES.md` for the current local-image inventory and provenance status
- **Content Licensing:** See `CONTENT-LICENSE.md` and individual file notices

---

*Begin with a question. Explore the boundaries of knowledge.*
