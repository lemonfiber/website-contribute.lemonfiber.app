import type { StarlightUserConfig } from "@astrojs/starlight/types";

import * as m from "../paraglide/messages.js";

type Sidebar = NonNullable<StarlightUserConfig["sidebar"]>;
type Group = Sidebar[number];

const group = (label: string, directory: string, collapsed = true): Group => ({
  label,
  collapsed,
  items: [{ autogenerate: { directory } }],
});

/** The sidebar, in reading order. */
export const sections: Sidebar = [
  { label: m.nav_start(), link: "/" },
  group(m.nav_community(), "community", false),
  group(m.nav_repos(), "repos"),
  group(m.nav_architecture(), "architecture"),
  group(m.nav_brand(), "brand"),
];
