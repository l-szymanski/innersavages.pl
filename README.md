# Inner Savages

The Inner Savages association website is a static Hugo site. It uses a small custom layout and plain CSS, with no Node.js dependencies or third-party theme.

## Requirements

- [Hugo Extended 0.165.0](https://github.com/gohugoio/hugo/releases/tag/v0.165.0), the version used to verify the build

## Local development

Run the development server from the repository root:

```sh
hugo server
```

Open the local URL printed by Hugo, usually <http://localhost:1313/>. Build the production site with:

```sh
hugo --minify
```

Hugo writes the generated site to `public/`. That directory is ignored by Git.

## Content

- Association pages live in `content/<page>/index.md`.
- News posts live in `content/news/<slug>/index.md`.
- Images and downloadable files that belong to a page live beside its `index.md` as page-bundle resources.
- Site-wide assets, including the logo, favicon, app icons, and PDFs, live in `static/`.

To add an association page, create `content/<slug>/index.md` with a title in its YAML front matter. To show it in the top navigation, also set `menu: true` and an `order` number; lower numbers appear first.

To add a news post, create a directory under `content/news/` and add an `index.md` file. Keep the slug equal to the directory name to retain the URL. For example:

```yaml
---
title: "Example news post"
date: 2026-10-05
featuredImage: "./example.jpg"
---

Short introduction shown on the homepage.

<!--more-->

The rest of the post.
```

Place `example.jpg` beside the Markdown file. The `<!--more-->` marker separates the homepage excerpt from the full post.

## Deployment

No tracked deployment pipeline or host configuration is present in this repository. Build the site with `hugo --minify` and publish the contents of `public/` through the existing hosting process. The production base URL is configured as `https://innersavages.pl/`; this migration does not change DNS or hosting settings.
