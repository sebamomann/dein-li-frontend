---
version: 1
slug: "src-app-app-component-html"
primary_target: "src/app/app.component.html"
related_targets: ["src/app/components/dashboard/dashboard.component.html","src/app/components/link/preview/preview.component.html"]
---

# Surface brief: dein.li app (all routes)

Scope: whole Angular app shell and routes (home/create, link preview, redirect status pages, link overview, per-link statistics, dialogs, impressum). Mode: Operate (task-first app UI); recipients also read the preview.

Audience/job: anyone shortening a link without an account; logged-in owners managing links and statistics; recipients checking a destination before being forwarded (mostly on phones).

Constraints: dark mode (user preference). Keep chain-link logo and the "dein.li"+faded "nk" wordmark. Standard controls (Angular Material MDC, M2 theme). German "du" copy. All existing functions and routes stay.

User decision: after three rounds the user chose "a mix of Sternkarte and the category standard" (chat, 2026-10-14): the standard's clean, familiar layout and hierarchy, with the star-chart world lending palette, type, density and the signature move.

## Direction contract

THESIS: A link shortener that feels like a calm night sky: every link is a star you can find again, and you always see which star a link leads to before you travel. Refuses the category's white-page-centred-input default and its neon-on-black tech cliché.

OWN-WORLD: Night-blue ground (#0A0E1A) with a barely visible coordinate grid; raised panels one step lighter (#121829) with 1px hairlines (#1E2638); star white text (#F2F4FF), muted slate (#8B95B2); one gold accent (#FFD27A) reserved for "your star": the primary action, the freshly created link, the selected item and chart peaks. State colours on top only where meaningful: amber for reported/threat, coral for locked/error. Light-weight geometric sans for display (Sora 300/600), same family for UI, monospace (Martian Mono) for short codes and URLs. No glow, no gradients beyond the sky; light is drawn as small solid points and thin rings.

STORY: The visitor pastes a long link and sees it become a named star (dein.li/x7Kp2Qa → youtube.com) ready to copy; recipients see the destination as the bright star before "Link öffnen"; owners read activity as a constellation and find their links as named stars in a list.

FIRST VIEWPORT (home, 1440x900): slim top bar (logo, wordmark, Meine Links / Link melden, Anmelden pill). Left column (~560px): light display headline, one-line promise, the URL field with gold "Kürzen" button inside one rounded panel, custom-name field (login-gated hint). Right: a sky panel where the newest link appears as a gold star with its mono label, destination and Kopieren; previous public activity as faint stars. Below the fold line: activity constellation chart (thin slate line, white points, gold peak) with Aufrufe and Geräte totals, range chips over it.

FORM: Sternkarte (star chart) fused with the category standard; position 6 on the grounded list for roll 2, chosen by the user as a mix with canon. Seed key e61cae51. Signature interaction: a created link "lights up" (point scales in, ring expands once, label writes in) with one motion grammar: 0.4s, one small overshoot; reduced motion shows the final state.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
