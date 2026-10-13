# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Owner and their circle:** Seba Momann plus friends and teams they share it with (e.g. a shared "streamteam" account). Logged in via Keycloak; create links, manage versions/permissions, check click statistics.
- **Organizations and clubs:** use dein.li links in posts, flyers and livestreams, and look at how often they were opened.
- **Anonymous public:** anyone can shorten a link on the home page without an account (custom short names require login).
- **Link recipients:** the most frequent visitors. They open a `dein.li/<short>` link and land on the preview page, or on a status page (threat warning, locked, not found, unknown error) before being sent on.

## Product Purpose

A self-hosted German URL shortener. Turns long URLs into short links (7 random characters, or a custom name for logged-in users), forwards recipients safely to the target, and gives link owners click statistics. Success: links are fast to create and share, recipients trust where a link takes them, owners understand how their links perform.

## Positioning

An independent, privately run shortener that puts the recipient's safety first: a preview showing the real target before forwarding, warnings for reported/dangerous links, and the ability to report a link. No third-party tracking or ads.

## Operating Context

- Recipients arrive from chats, social posts, printed flyers and livestream overlays, often on phones, and want to get to the target quickly while knowing what it is.
- Creators shorten a link on the home page, copy/share it immediately; logged-in owners revisit the overview to compare links and look at statistics over chosen time ranges (minutes to months, custom ranges, optional auto-refresh).
- Backend API at api.dein.li; login via Keycloak at account.sebamomann.de (realm "sebamomann").

## Capabilities and Constraints

- Create short link (anonymous: random 7-char short; logged in: optional custom short name).
- Link preview page (`/link/preview/:short`, also reached via `dein.li/<short>`): shows target URL, creation date, "Link öffnen" / "Zurück", report block.
- Redirect status pages: threat (reported link, can still open), locked, not found, unknown.
- Report a link ("Link melden").
- Global click statistics on the home page (chart over a selectable range + total calls + distinct devices).
- Logged-in: link overview (sort, infinite scroll), per-link page with statistics, version history (a short can point to new targets over time), add version, permissions.
- Impressum (legally required, content must stay as-is).
- Installable PWA with service worker; a service-worker patch must let `/<short>` paths reach the network.
- Stack: Angular 22 + Angular Material 22 (M2 theme), Chart.js 4, served by nginx; runtime config injected via `assets/env.js`.
- UI language: German, informal "du" (a few strings still use "Sie"; inconsistent).

## Brand Commitments

- Name: "dein.li" (domain); the wordmark currently renders "dein.link", with "nk" de-emphasised, and the page title is "dein.link - In Kurzform". Logo: chain-link icon (`src/assets/icons/icon_stripped.png`, PWA icons in `src/assets/icons/`).
- "Created by Seba Momann" footer credit.

## Evidence on Hand

- Real usage data via the API (global and per-link click statistics).
- Illustrations: `src/assets/img/robot.png` (status pages), `src/assets/img/404.svg`, hexagon background in `src/assets/img/background/`.
- No testimonials, user counts, press or claims of any kind; none may be invented.

## Product Principles

1. The recipient comes first: always make clear where a link leads before sending anyone there.
2. Creating a link takes seconds and needs no account.
3. Statistics are for understanding, not surveillance: aggregate counts only, no third-party tracking.
4. Independent and honest: no ads, no dark patterns, no fabricated social proof.

## Accessibility & Inclusion

Public-facing and frequently used on phones by non-technical recipients: readable text, clear contrast, large touch targets, keyboard-reachable primary actions ("Link öffnen" is autofocused today).
