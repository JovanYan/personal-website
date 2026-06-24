# Design QA — Portfolio Demo

- Preview: `http://127.0.0.1:8080`
- Desktop viewport checked: 1280 × 720
- Mobile viewport checked: 390 × 844
- Visual source: existing soft-Y2K/editorial portfolio direction in `qa/source-soft-y2k-index.png`

## Result

Passed for demo handoff.

- Hero uses the confirmed professional portrait and keeps the existing warm-paper, editorial-serif and electric-blue visual system.
- About, six-page Journey, three case cards, Me & AI and Contact follow the locked content structure.
- Journey previous/next controls, page click areas, city shortcuts and swipe behavior work.
- All three case cards open the correct lightweight detail drawer.
- WeChat / Phone opens the confirmed QR code in a modal.
- Time Anchor remains available as an embedded live prototype and a standalone link.
- All referenced images loaded successfully during browser QA.
- No browser console errors were found.
- Mobile layout has no horizontal page overflow at 390 px.
- Intro highlights products, stories, and experiences with one consistent blue italic treatment.
- About evidence is grounded in the confirmed Kuaishou, PepsiCo / Quaker, ZURU, and Time Anchor experience.
- Each Journey photograph is bound to its matching note; all five notes stay below 50 English words.
- Journey uses OPEN, Peel back, Back to contents, page-side click, and swipe interactions without a duplicate Turn page button.
- Case drawers inherit their visible title, label, and role line from the card that opened them.
- WHAT I’D DO BETTER / NEXT STEP appears as a high-contrast editorial callout.

## Intentional Demo Constraints

- The site remains plain HTML/CSS/JS with no build step or framework.
- Case details are concise overlays rather than separate routed pages.
- Google Fonts improve the intended look when online; system fallbacks remain available offline.
