#!/usr/bin/env node
/** Fetches the pinned repositories and refuses a pin left behind past its window. */
import { HEALTH } from "@lemonfiber/website-kit/health";
import { runPins } from "@lemonfiber/website-kit/run/pins";
import { TOKENS } from "@lemonfiber/website-kit/tokens";

runPins({
  root: new URL("..", import.meta.url).pathname,
  guarded: [HEALTH, TOKENS],
});
