# NSuns

This is a dashboard for my home gym, tailored to my workout routine, [nsuns 5/3/1](https://liftvault.com/programs/powerlifting/n-suns-lifting-spreadsheets/).

It keeps track of the maxes and reps each week, and can update maxes based on reps achieved. The max and rep history is saved in the browser's indexedDB.

This runs on a raspberry pi attached to a TV on the wall.

My personal copy includes voice-control. I cannot release this version because the license for the voice-activation library prevents me from doing so.

## Tech Stack

- UI: React
- State Management: Zustand
- Async State: React-Query
- Build Tool: Vite
- Testing: Jest
- Styles: Tailwind and PostCSS
- 100% Typescript

## Usage

Clone this repo, then run `yarn build`.

Serve the static site with `serve -s dist` (install [serve](https://www.npmjs.com/package/serve) first).

All state is saved locally in indexedDB, so you can run it without an internet connection.
