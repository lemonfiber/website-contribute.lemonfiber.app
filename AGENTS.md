# AGENTS.md — website-contribute.lemonfiber.app

> **Start at the roadmap and board on [lemonfiber.app](https://lemonfiber.app),
> rendered from the report of where every unreleased version stands. Then the
> rules** every repository shares:
> [working in the repositories](https://github.com/lemonfiber/spec/blob/main/50-governance/working-in-the-repositories.md)
> and [the rules for agents](https://github.com/lemonfiber/spec/blob/main/50-governance/ai-contributors.md).
> This file holds only what is true of this repository.

## What this repo is

The contributor site, published at
[contribute.lemonfiber.app](https://contribute.lemonfiber.app). An Astro
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

`pins-sources` runs on every pull request and is not in `npm run ci`, because it
fetches the repositories this site pins and a build may not reach the network.
