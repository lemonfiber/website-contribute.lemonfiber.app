#!/usr/bin/env node
/** Holds the tree to the kit's structural rules; this site keeps none of its own. */
import { runGuards } from "@lemonfiber/website-kit/run/guards";

await runGuards({ root: new URL("..", import.meta.url).pathname });
