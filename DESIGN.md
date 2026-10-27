---
name: dein.li
description: A self-hosted German link shortener drawn as a calm night sky; every link is a star you can find again.
colors:
  sky-0: "#070A13"
  sky: "#0A0E1A"
  sky-1: "#121829"
  sky-2: "#182036"
  line: "#1E2638"
  line-2: "#2C3652"
  star: "#F2F4FF"
  text-2: "#C3C9DC"
  muted: "#8B95B2"
  muted-2: "#5D6684"
  gold: "#FFD27A"
  gold-ink: "#1A1300"
  amber: "#FFB347"
  coral: "#FF7A72"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  destination:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 2.75rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\""
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: "36px"
  label:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  short-label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)"
    fontWeight: 500
    lineHeight: 1.2
    fontFeature: "\"liga\" 0"
  mono-url:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"liga\" 0"
rounded:
  focus: "6px"
  control: "10px"
  field: "12px"
  well: "14px"
  panel: "18px"
  point: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
  section: "56px"
  section-lg: "72px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.field}"
    height: "36px"
  button-primary-large:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.field}"
    height: "52px"
    padding: "0 24px"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.star}"
    typography: "{typography.button}"
    rounded: "{rounded.field}"
    height: "36px"
  button-outlined-risky:
    backgroundColor: "transparent"
    textColor: "{colors.amber}"
    rounded: "{rounded.field}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.star}"
    rounded: "{rounded.field}"
  nav-link-active:
    textColor: "{colors.gold}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.star}"
    rounded: "{rounded.field}"
    height: "56px"
  panel:
    backgroundColor: "{colors.sky-1}"
    textColor: "{colors.star}"
    rounded: "{rounded.panel}"
    padding: "24px"
  sky-panel:
    backgroundColor: "{colors.sky-0}"
    textColor: "{colors.star}"
    rounded: "{rounded.panel}"
    padding: "32px 32px 0"
  range-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.field}"
    height: "34px"
    padding: "0 12px"
  range-toggle-selected:
    backgroundColor: "{colors.sky-2}"
    textColor: "{colors.star}"
  list-row:
    backgroundColor: "{colors.sky-1}"
    textColor: "{colors.star}"
    height: "60px"
    padding: "0 24px"
  list-row-hover:
    backgroundColor: "{colors.sky-2}"
  star-point:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.point}"
    size: "12px"
  star-point-quiet:
    backgroundColor: "{colors.star}"
    rounded: "{rounded.point}"
    size: "7px"
  status-star:
    backgroundColor: "{colors.muted}"
    rounded: "{rounded.point}"
    size: "56px"
  avatar:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.point}"
    size: "26px"
  menu:
    backgroundColor: "{colors.sky-2}"
    textColor: "{colors.star}"
  dialog:
    backgroundColor: "{colors.sky-1}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.panel}"
  snackbar:
    backgroundColor: "{colors.star}"
    textColor: "{colors.sky}"
---

# Design System: dein.li

## Overview

**Creative North Star: "The Star Chart"**

dein.li is a calm night sky with the familiar layout of a link shortener laid over it. The page ground is a deep night blue; content sits on flat panels one step lighter, separated by 1px hairlines. Light is drawn, never emitted: a link is a small solid point with one thin ring, a chart is a constellation of white points joined by a thin slate line, a missing link is an empty dashed ring. There is one warm colour in the whole sky, gold, and it belongs to "your star": the primary action, the freshly created link, the selected item, the chart's peak.

The system is task-first and quiet. Standard Angular Material controls (M2 dark theme, MDC) keep every interaction familiar; the star-chart world supplies the palette, a light geometric sans (Sora) with a monospace (Martian Mono) for anything a person pastes or copies, the low density, and one signature move: a created link lights up. Status is said with star states (an amber point for a reported link, a coral ring for a locked one, an empty dashed ring for "nothing here") rather than icons or banners.

The world rejects two category defaults by construction: the white page with a centred input, and neon-on-black tech styling. There is no glow, no gradient beyond the sky itself, no coloured shadow.

**As built, against the direction contract.** The contract placed a barely visible coordinate grid on the page ground and called for panels one step lighter. The build keeps the page ground plain and draws the grid only inside the home page's sky panel, which is one step *darker* (`sky-0`) than the page: a recessed window into deeper sky rather than a raised panel. The build adds a logged-out account band ("Deine Links an einem Ort") between the hero and the activity chart that the contract's first viewport did not name. "Anmelden" is a 12px-radius outlined button, not a pill. The range chips became a segmented toggle group on the activity heading row, with further options behind a tune icon. A reported link is marked by an amber point beside its destination rather than by a status star. These are recorded as the shipped system.

**Key Characteristics:**
- Night-blue ground, flat panels one tonal step up, 1px hairlines; depth by tone, not shadow.
- One accent (gold) used only for the user's own star and the single primary action on a view.
- Sora at light 300 for display and numbers, 600 for titles and emphasis; Martian Mono for short codes and URLs.
- Points and thin rings as the only graphic vocabulary; status speaks through star states.
- One motion grammar: 400ms with one small overshoot; reduced motion shows the final state.

## Colors

A near-monochrome night-blue scale with one warm gold accent and two state colours that appear only where a state exists.

### Primary
- **Your-Star Gold** (`gold`): the one accent. Filled primary buttons (Kürzen, Kopieren, Link öffnen, Neuer Link, Zur Startseite), the freshly created short code, the star point beside a destination, the chart peak and its ring, the active nav link, focus outlines, the focused field outline and caret, the account avatar, and the logo's hexagon stroke. Never used for decoration or large fills.
- **Gold Ink** (`gold-ink`): text and icons on gold (button labels, skip link, avatar initial).

### Secondary
- **Warning Amber** (`amber`): reported or threatening links only. The point beside a reported destination, the "Trotzdem öffnen" outlined button (label in amber, outline amber at 50%), the hover colour of "Link melden" in the report block.

### Tertiary
- **Locked Coral** (`coral`): locked links and errors. The ring of the locked status star, form-field error outlines, labels and messages.

### Neutral
- **Deep Sky** (`sky-0`): the recessed ground inside the sky panel and the chart-filter options well; one step darker than the page.
- **Night Sky** (`sky`): page ground, scrollbar track, snackbar text.
- **Panel Sky** (`sky-1`): every flat panel, cards, dialogs, list containers.
- **Raised Sky** (`sky-2`): menus, select panels, the selected range toggle, list-row hover, the logo hexagon fill.
- **Hairline** (`line`): 1px panel borders, row dividers, the top bar and footer rules, chart grid lines.
- **Strong Hairline** (`line-2`): outlined button and field strokes, toggle group borders, the constellation line in the sky panel, the version-history thread, empty and neutral status rings, scrollbar thumb.
- **Star White** (`star`): primary text, quiet star points, chart data points.
- **Soft Text** (`text-2`): secondary text: leads, destinations in lists, full URLs in panels, dialog supporting text, footer links.
- **Muted Slate** (`muted`): labels, meta, hints, column heads, the faded `dein.li/` base of short labels, faint stars, inactive range toggles, chart axis ticks.
- **Faint Slate** (`muted-2`): disabled states, the faded "nk" of the wordmark, the chart line, unknown and locked status points.

### Named Rules
**The One Star Rule.** Gold marks the user's own star and the single primary action on a view; nothing else is gold. A screen with two gold areas competing for the eye is wrong.

**The State-Only Colour Rule.** Amber and coral appear only when a link is reported, locked or in error. They are never used to decorate or to signal ordinary emphasis.

## Typography

**Display Font:** Sora (with system-ui, sans-serif), self-hosted at 300, 400, 600 and 700.
**Body Font:** Sora, same family for UI.
**Label/Mono Font:** Martian Mono (with ui-monospace, monospace), self-hosted at 400 and 500, ligatures off.

**Character:** a light, wide geometric sans that reads like star-chart lettering at large sizes and stays plain at body size; the monospace marks exactly the strings a person pastes, copies or compares.

### Hierarchy
- **Display** (Sora 300, fluid 2.5 to 3.75rem, 1.04): the home headline only. A second line may switch to 600 for the promise ("kurz und sicher.").
- **Destination** (Sora 600, fluid 2.25 to 4rem, 1.05): the destination domain on the preview page; the largest type in the system because the recipient's question is "where does this go?".
- **Headline** (Sora 300, fluid 2 to 2.75rem, 1.1): page titles of status pages, the link overview and empty states.
- **Numeral** (Sora 300, 2.5rem, tabular): totals beside the chart (Aufrufe, Geräte).
- **Title** (Sora 600, 1.5rem): section headings (Aufrufe auf dein.li, Statistik, Verlauf). **Title-sm** (600, 1.25rem): the account band heading and the wordmark.
- **Lead** (Sora 400, 1.125rem, `text-2`, max 46ch): the line under the display headline; status-page copy uses 1.0625rem, max 60ch.
- **Body** (Sora 400, 16px, 1.55): default text.
- **Label** (Sora 400, 0.8125 to 0.875rem, `muted`): column heads, meta, totals' terms, footer.
- **Short Label** (Martian Mono 500, `dein.li/` base at 400 in `muted`): every short link. Fluid 1.5 to 2.125rem in gold for the freshly created link; 1.75 to 2.75rem in gold as the per-link page title; body size in `star` in lists and the preview line.
- **Mono URL** (Martian Mono 400, 12 to 14px, `text-2` or `muted`): full destination URLs and the URL and custom-name inputs. On the preview the address is split: scheme in `muted`, host in `star` at 500 (it decides where you land), the rest in `text-2`, wrapping only before `/ ? & #`.

### Named Rules
**The Light-and-Bold Rule.** Large type is Sora 300; emphasis is Sora 600. Mid weights do not carry hierarchy.

**The Pasted-String Rule.** Anything a person pastes, copies or compares character by character (short codes, URLs, the `dein.li/` prefix) is Martian Mono with ligatures off; nothing else is.

## Layout

Every route sits in one page column: `min(1180px, 100% - 32px)`, centred. The top bar is 64px high and sticky; content has 48px top and 96px bottom padding (28px top on phones). Status pages, the preview and empty states share a narrower left-aligned "notice" column, `min(620px, 100% - 32px)`, placed 8vh from the top (the preview 6vh lower).

The home page is the category-standard two-column hero: a create column (1.1fr) beside the sky panel (1fr) with a 40px gap, stacking to one column below 900px. Logged-out visitors then see a full-width account band ("Deine Links an einem Ort", 40px below), and the activity section follows 72px below with its heading and range control on one row above a chart panel. The per-link page uses 56px between sections.

Spacing is a loose 4px rhythm with recurring steps of 8, 12, 16, 24, 32, 40, 56 and 72px; panels pad 24px (16px on phones), the sky panel 32px (20 to 24px on phones). Breakpoints in use: 560px (form fields and buttons stack, actions go full width), 720px (top bar trims to icon actions, "Meine Links" moves into the account menu, the overview table becomes two-line rows), 760px (chart totals move under the plot), 900px (home hero stacks).

**The Familiar Frame Rule.** Layout follows the category standard (top bar, create form first, results beside it, statistics below); the star-chart world lives in palette, type, marks and motion, not in an unusual page structure.

## Elevation & Depth

The system is flat. Depth is tonal: the page ground (`sky`), panels one step lighter (`sky-1`), raised controls and menus one more (`sky-2`), and recessed wells one step darker (`sky-0`). Panels separate by a 1px `line` border, not by shadow. Material's default elevation is overridden to night-blue surfaces.

The only shadow-like device is a solid ring: the current version point in the link history carries a 5px `sky-1` gap ring and a 1px gold ring at 45%, the same point-and-ring drawn with box-shadow. The sticky top bar is the one translucent surface (night sky at 82% with a 10px backdrop blur) so content can pass under it.

### Named Rules
**The Drawn-Light Rule.** Light is a small solid point and thin 1px rings. No glow, no blur halos, no coloured shadows.

**The Tonal Step Rule.** To raise something, move it one step along `sky-0`, `sky`, `sky-1`, `sky-2` and give it a hairline; do not add a shadow.

## Shapes

Gently rounded rectangles hold content; perfect circles mark stars. Panels, cards and dialogs use an 18px radius; buttons, form fields, the range toggle group and loading skeletons 12px; the chart options well 14px; small insets (skip link, the dialog's current-URL box) 10px; the focus outline 6px. Points, rings, avatars and status stars are full circles. Borders are 1px throughout; dashed 1px rings and dashed constellation lines mean "empty" or "nothing yet". The logo is a hexagon outlined in gold around a two-link chain drawn as stroked rounded rectangles.

## Components

### Buttons
Standard Material buttons, re-skinned; confident but quiet.
- **Shape:** gently curved (12px radius), Sora 600 at 15px.
- **Primary (flat):** gold fill with gold-ink label. One per view. Grows to 56px high beside the 56px form field (Kürzen) and 52px with 24px side padding on the preview page (Link öffnen); full width on phones under 560px.
- **Outlined:** transparent with a `line-2` 1px outline and star-white label (Vorschau, Zurück, Anmelden). The risky variant ("Trotzdem öffnen") recolours outline and label to amber.
- **Text:** star-white label, no container (Statistik, Meine Links, Link melden). Active nav link turns gold.
- **Focus:** 2px gold outline with 3px offset, 6px radius, on every focusable element.

### Range Control (chips)
- **Style:** a segmented Material button-toggle group with a `line-2` border, 12px radius, 34px line height, 13px labels in `muted`; dividers in `line-2`.
- **State:** the selected range fills `sky-2` with star-white text; no checkmark. A tune icon button toggles an options well (`sky-0`, 1px `line`, 14px radius) holding auto-refresh and custom-range fields; the icon turns gold while open, and a gold "Live" label with a determinate spinner shows auto-refresh.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** `sky-1` with a 1px `line` border.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Internal Padding:** 24px (form: 24px 24px 12px; account band: 24px 28px), 16px on phones.

### Inputs / Fields
- **Style:** Material outlined fields, transparent with a `line-2` 1px stroke and 12px radius, `muted` label, star-white input text. URL and custom-name inputs are Martian Mono at 14px; the custom name carries a `dein.li/` mono prefix in `muted`.
- **Focus:** stroke, floating label and caret turn gold; hover stroke goes to `muted`.
- **Error / Disabled:** coral stroke, label and message (13px); disabled stroke `line`, text `muted`. The login-gated hint turns gold when the user clicks the locked custom-name field.

### Navigation
- **Style:** sticky 64px top bar on translucent night sky with a bottom hairline. Left: hexagon-and-chain mark (32px) with the "dein.li" wordmark in Sora 600 and a faded "nk" in `muted-2`. Right: text-button links (Meine Links when logged in, Link melden with a flag icon) and the account control.
- **Account:** logged out, an outlined "Anmelden" button with a login icon; logged in, a 26px gold avatar with the initial in gold-ink, the account name (max 14ch) and a muted chevron, opening a `sky-2` menu.
- **Mobile (720px and below):** "Meine Links" moves into the account menu, Link melden and the account control collapse to icon-only.

### Short Label
The way every short link is written: Martian Mono 500, ligatures off, with the `dein.li/` base in Martian Mono 400 `muted`. Gold when it is the user's fresh or focused star, star-white elsewhere.

### Star Point and Status Star
- **Star point:** a 12px gold dot with a 1px gold ring at 45% opacity, 7px outside it; 16px with a 9px ring as the preview's destination mark. The quiet variant is a 7px star-white dot with no ring (overview rows), which turns gold on row hover or focus.
- **Status star:** a 56px mark for status pages and empty states: a 12px point inside a 40px 1px ring. Neutral: `muted` point, `line-2` ring. Locked: `muted-2` point (8px), coral ring. Empty (not found, no links yet): no point, dashed `line-2` ring. Unknown: `muted-2` point. A reported link instead shows a 10px amber point beside its destination domain at 1.75rem.

### Sky Panel (signature)
The home page's right column: an 18px-radius panel on `sky-0` with a 48px coordinate grid drawn in `line-2` at 35%, minimum 400px high (340px when stacked). Before a link exists it shows a dashed 26px ring with "Hier erscheint dein Link…" and a dashed constellation placeholder. A created link appears top-left as a gold star point beside its gold short label, the destination domain ("führt zu **youtube.com**"), the full URL in 12px mono truncated, and Kopieren (primary) / Vorschau (outlined) / Statistik (text, logged in). Earlier links of the session sit in the lower 36% as 5px `muted` points joined by a 1px `line-2` polyline, each labelled with its 11px mono short code. With a fresh link and no history the panel collapses to its content (compact).

**Light-up motion:** the point scales from 0 to 1 over 400ms with one small overshoot (`cubic-bezier(.34, 1.4, .64, 1)`); the label fades in from 8px left over 400ms (`cubic-bezier(.16, 1, .3, 1)`); the ring expands once from 40% over 1.2s. Under reduced motion every animation and transition is clamped to 0.01ms, so the final state shows at once.

### Constellation Chart (signature)
Chart.js line chart in a panel: straight segments (no tension) in a 1.5px `muted-2` line, 2.5px star-white points only where calls happened, the peak as a 4px gold point with a 9px 1px gold ring drawn by a plugin. Grid lines `line`, axis ticks Sora 12px `muted`. Plot 260px high (220px on narrow screens) beside a 180px totals column (Aufrufe, Geräte as Numerals) separated by a 1px `line` rule; totals move under the plot below 760px. Tooltip: dark surface, `line-2` border, muted title, star-white Sora 600 body, no colour swatches.

### Link List and Version Thread
- **Overview list:** a panel holding a column-head row (40px, 13px `muted`) and 60px rows divided by `line`, columns short label / destination (`text-2`) / calls (right-aligned, tabular) / created date (`muted`). Hover and focus fill `sky-2` (0.15s) and light the row's quiet point gold. On phones each row becomes two lines (name and calls, destination and date).
- **Version thread:** versions as a vertical timeline joined by a 1px `line-2` thread; past versions are 7px `muted` points, the current version a 12px gold point with its ring and a gold "aktuell" tag at 0.8125rem 600.

### Settings and Switches
- **Setting row** (global `.setting`): label (Sora 600, `star`) and a `muted` 0.875rem description on the left, the switch on the right, 20px 24px padding (16px on phones); stacked rows divide by a `line` hairline inside one panel. Used on the settings page, the admin account list and the per-link "Ohne Vorschau weiterleiten" row.
- **Switch:** Material slide toggle without icons on a `line-2` track; the handle is a `muted` point when off and a gold point when on, no shadow. Disabled drops to 50 to 60% opacity.
- **Account standing:** a 10px solid star-white point for a trusted account, a dashed `muted` ring for one not yet trusted.
- **Forwarding state:** when a trusted link skips the preview, the preview page still shows the destination domain at Destination size, "Du wirst von dein.li/… weitergeleitet …" and the full URL, while the star point's ring expands and fades on a 1.2s loop.

### Loader and Feedback
- **Loader:** a single 9px gold point that twinkles (opacity 0.25 to 1, scale 0.7 to 1, 1.2s alternating) beside `muted` text.
- **Skeleton:** a 64px, 12px-radius block shimmering between `sky-1` and `sky-2` while the preview target loads.
- **Snackbar:** inverted, star-white surface with night-sky text.
- **Dialogs:** `sky-1` surface, 18px radius, star-white heading, `text-2` body; the current URL sits in a `sky-0` inset with a hairline and 10px radius.

## Do's and Don'ts

### Do:
- **Do** keep gold for the user's own star and the single primary action on a view (The One Star Rule).
- **Do** write every short code and URL as a Short Label or Mono URL in Martian Mono, with the `dein.li/` base faded to `muted`.
- **Do** show the destination before any forward action, with the destination domain as the largest type on the page.
- **Do** express status with star states (amber point, coral ring, dashed empty ring) on the shared notice layout.
- **Do** raise surfaces by one tonal step plus a 1px hairline (`sky-0`, `sky`, `sky-1`, `sky-2`).
- **Do** animate with the 400ms light-up grammar and let reduced motion show the final state.
- **Do** keep standard Material controls and re-skin them through the token overrides in the global stylesheet.

### Don't:
- **Don't** add glow, blur halos, coloured shadows or neon accents; light is points and 1px rings (The Drawn-Light Rule).
- **Don't** use gradients for surfaces or decoration; the sky panel's coordinate grid is the only patterned ground (the loading skeleton's shimmer is a transient state, not a surface).
- **Don't** use amber or coral outside a reported, locked or error state.
- **Don't** set body copy or headings in the monospace, or short codes in Sora.
- **Don't** set display-size Sora at mid weights (400 or 500); large type is 300, emphasis 600.
- **Don't** replace the hexagon-and-chain mark or drop the faded "nk" of the wordmark.
