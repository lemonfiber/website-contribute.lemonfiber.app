# website-contribute.lemonfiber.app

The lemonfiber contributor site: how a change gets in, how each repository is
built and tested, how the core is put together, and the brand. It is for a
person or an agent changing the code. Running lemonfiber, or building on its
API, is on [the documentation site](https://docs.lemonfiber.app).

Published at [contribute.lemonfiber.app](https://contribute.lemonfiber.app).

## What it is

An [Astro Starlight](https://starlight.astro.build) site that renders and does
not own. Every page apart from the landing page belongs to another repository:
each is brought in as a git submodule under `vendor/`, pinned to an exact
revision, and reached through a symlink under `src/content/docs/`.
`mirrors.json` says which tree lands at which route. A mirrored page's edit link
points at the repository that owns it, and its footer names the revision it was
rendered from.

The rules a change follows are pages of the
[specification](https://github.com/lemonfiber/spec), under `50-governance/`. The
landing page links each one where the frontpage renders it,
[lemonfiber.app/spec/](https://lemonfiber.app/spec/), rather than copying it here
(REPO-R70).

The machinery — mirroring, link rewriting, the guards, the link check, the pin
checks and the pull request that moves the pins, the accessibility sweep — is
[`lemonfiber/website-kit`](https://github.com/lemonfiber/website-kit), taken by
commit. The scripts under `scripts/` call it and add nothing of their own.

## Sections

`src/lib/sections.ts` is the sidebar:

| Section               | Under            | From                                                                    |
| --------------------- | ---------------- | ----------------------------------------------------------------------- |
| Start here            | `/`              | this repository: the landing page, and the specification's rules linked |
| Taking part           | `/community/`    | the organisation's health files, in `lemonfiber/.github`                |
| The repositories      | `/repos/`        | each repository's own `README.md`                                       |
| How the core is built | `/architecture/` | `lemonfiber/lemonfiber`'s `.docs/architecture/`                         |
| The brand             | `/brand/`        | `lemonfiber/brand`'s `.docs/`                                           |

## Running it

```sh
npm ci
npm run messages   # compile the message catalogue
npm run dev
```

`npm ci` also turns on this repository's git hooks, through npm's `prepare`:
`.githooks/commit-msg` refuses a commit CI would refuse, and
`.githooks/pre-push` refuses a push that would leave a branch carrying no commit
`origin/main` does not.

`npm run ci` is the whole gate, and it is what CI runs, after `npm run browser`
installs the Chromium the accessibility sweep drives:

| Step           | What it checks                                              |
| -------------- | ----------------------------------------------------------- |
| `messages`     | The message catalogue compiles                              |
| `sync`         | Astro's generated types are current                         |
| `format:check` | Prettier, with the Astro plugin registered explicitly       |
| `lint`         | ESLint, zero errors and zero warnings, including `scripts/` |
| `types`        | `astro check`, failing on errors, warnings **and** hints    |
| `guard`        | The kit's structural guards over this tree                  |
| `build`        | The site builds, links validate, Pagefind indexes           |
| `links`        | Every address the built site sends into a pinned repository |
| `a11y`         | axe over the built site, both themes, WCAG 2.1 AA           |

The guards refuse a real file under a mirror route: the fix for a mirrored page
is a pull request to the repository that owns it.

## Pins

`.github/workflows/bump-pins.yml` takes every pin that has moved, the kit's
included, in one pull request, `pins/all`, which merges itself when the guards
hold. `pins-sources` in `.github/workflows/pins.yml` refuses every pull request
once a commit touching a file a page here renders has waited longer than its
window untaken.

`lychee-site.toml` configures the `links` workflow, which runs lychee over the
built site on a schedule for the addresses no checkout can answer for.

## What it consumes

| Package                   | Why                                                         |
| ------------------------- | ----------------------------------------------------------- |
| `@lemonfiber/brand`       | Colour, type, spacing and radii, pinned by commit           |
| `@lemonfiber/website-kit` | The mirroring, guards and checks every site runs, by commit |

`src/app.css` imports the brand tokens and renames them into this site's names;
it declares no colour of its own. Brand's dark theme is `[data-lf-theme="ink"]`
and Starlight's is `[data-theme="dark"]`, and `astro.config.ts` mirrors the
second onto the first.

## Licence

[Hippocratic License 3.0](LICENSE): source-available and ethical-source, not
OSI-approved. Made by NightWorksIO.
