# AGENTS.md — website-contribute.lemonfiber.app

Orientation for a focused session in this repo.

> **Common rules for every lemonfiber repo** live in the spec repo, at
> [50-governance/ai-contributors.md](https://github.com/lemonfiber/spec/blob/main/50-governance/ai-contributors.md).
> This file is the contributor-site header; the shared rules are canonical
> there.

## What this repo is

The contributor site, deployed to GitHub Pages under the domain
`contribute.lemonfiber.app`. An Astro
Starlight site whose pages, apart from the landing page, are other repositories'
own files: pinned git submodules under `vendor/`, reached through symlinks under
`src/content/docs/`. `README.md` is the long version; the spec page for this
repo is `30-repos/website-contribute.md`.

## The load-bearing rule

**It renders; it does not own.** A mirrored page belongs to the repository it
came from, and the fix for anything wrong with it is a pull request there. The
guards refuse a real file under a mirror route. The contribution rules
themselves are specification pages, linked from the landing page and never
copied here.

The machinery is `@lemonfiber/website-kit`, taken by commit. A change to how
mirroring, the guards or the pin checks work is a pull request to
`lemonfiber/website-kit`, and this repository takes it when `bump-pins` moves
the pin.

## Where things are

|                       |                                              |
| --------------------- | -------------------------------------------- |
| `src/content/docs/`   | the landing page, and the mirror symlinks    |
| `mirrors.json`        | which upstream tree lands at which route     |
| `src/lib/sections.ts` | the sidebar                                  |
| `messages/`           | every word the chrome shows                  |
| `scripts/`            | the kit's runners, called with this checkout |
| `a11y/`               | the routes the accessibility sweep reads     |

## Before you push

```sh
npm ci        # also what turns this clone's git hooks on
npm run ci
```

`.githooks/commit-msg` refuses a commit CI would refuse — a non-conventional
subject, a missing sign-off, a missing `Spec:` citation, or a trailer crediting
an assistant. The four rules are in
[50-governance/contributing.md](https://github.com/lemonfiber/spec/blob/main/50-governance/contributing.md#what-a-commit-message-has-to-carry).
`pins-sources` runs on every pull request and is not in `npm run ci`, because it
fetches the repositories this site pins and a build may not reach the network.
