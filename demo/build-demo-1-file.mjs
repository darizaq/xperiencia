// Generates demo/demo-1-file.html: a single, fully self-contained HTML file with the
// compiled web-component bundle, all three destinations' data, and the demo logic all
// declared inline — no fetch(), no external .js/.json files, so it also works when
// opened directly via file:// (no local server needed).
//
// Run after rebuilding the element bundle:
//   npm run build:element && node demo/build-demo-1-file.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const demoDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(demoDir, '..');

const DESTINATIONS = [
  { key: 'ecuador', label: 'Ecuador' },
  { key: 'bolivia', label: 'Bolivia' },
  { key: 'peru', label: 'Perú' },
];

const bundleJs = readFileSync(
  join(repoRoot, 'dist/xperiencia-element/browser/main.js'),
  'utf8',
).trim();

function readJson(...pathSegments) {
  return JSON.parse(readFileSync(join(demoDir, ...pathSegments), 'utf8'));
}

const destinationsData = Object.fromEntries(
  DESTINATIONS.map(({ key }) => [
    key,
    {
      dateRanges: readJson('data', key, 'date-ranges.json'),
      items: readJson('data', key, 'itinerary-items.json'),
      legendLabels: readJson('data', key, 'elevation-labels.json'),
    },
  ]),
);

const html = `<html>
  <head>
    <meta charset="utf-8" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        background: #545454;
        color: #fff;
        font-family: "Poppins", sans-serif;
      }

      /* Demo-only: styles the destination switcher, not part of the web component. */
      .demo__destinations {
        display: flex;
        gap: 6px;
        margin-bottom: 20px;
      }

      .demo__destination {
        flex: 1;
        padding: 11px 0 12px;
        background: #323232;
        border: 0;
        border-radius: 12px;
        cursor: pointer;
        font-family: inherit;
        font-size: 15px;
        font-weight: 500;
        color: #e2e2e2;
        transition: color 0.15s ease, background-color 0.15s ease;
      }

      .demo__destination:hover {
        color: #fff;
        background: #404040;
      }

      .demo__destination--selected,
      .demo__destination--selected:hover {
        color: #fff;
        background: #9d9d9d;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <h1>Web Component Demo (single file)</h1>

    <div id="destination-tabs" class="demo__destinations" role="tablist" aria-label="Elegir destino"></div>
    <div id="itinerary-container"></div>

    <!-- All scripts declared at the bottom of the body. -->

    <!-- Compiled \`xperiencia-itinerary\` web component (built by \`npm run build:element\`). -->
    <script>${bundleJs}</script>

    <!-- Demo data + logic, all inline (no fetch, no external files). -->
    <script>
      const DESTINATIONS = ${JSON.stringify(DESTINATIONS, null, 2)};

      // Each destination's data, inline. Dates are "YYYY-MM-DD" strings here (JSON has no
      // Date type) and get parsed into local Dates below.
      const DESTINATION_DATA = ${JSON.stringify(destinationsData, null, 2)};

      // Parsed as a local date (rather than \`new Date(string)\`, which parses as UTC and
      // can shift a day off).
      function toLocalDate(value) {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
      }

      function resolveDestinationData(key) {
        const data = DESTINATION_DATA[key];
        return {
          dateRanges: data.dateRanges.map((range) => ({
            startDate: toLocalDate(range.startDate),
            endDate: toLocalDate(range.endDate),
          })),
          // \`items\` is the day-by-day template (relative \`dayNumber\`, not an absolute
          // date), shared across every date range — the component resolves it against
          // whichever range is selected.
          items: data.items,
          legendLabels: data.legendLabels,
        };
      }

      customElements.whenDefined('xperiencia-itinerary').then(() => {
        const tabsEl = document.getElementById('destination-tabs');
        const containerEl = document.getElementById('itinerary-container');

        let selectedIndex = 0;

        // Rebuilds the \`<xperiencia-itinerary>\` element from scratch instead of just
        // re-setting its properties, so switching destinations also resets its own
        // internal state (selected date range / day) rather than carrying over a
        // selection that may not exist in the new destination's data.
        function mountItinerary(index) {
          selectedIndex = index;
          const resolved = resolveDestinationData(DESTINATIONS[index].key);

          containerEl.replaceChildren();
          const el = document.createElement('xperiencia-itinerary');
          containerEl.appendChild(el);

          el.legendLabels = resolved.legendLabels;
          el.dateRanges = resolved.dateRanges;
          el.items = resolved.items;

          tabsEl.querySelectorAll('.demo__destination').forEach((button, buttonIndex) => {
            button.classList.toggle('demo__destination--selected', buttonIndex === index);
            button.setAttribute('aria-selected', String(buttonIndex === index));
          });
        }

        DESTINATIONS.forEach((destination, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'demo__destination';
          button.setAttribute('role', 'tab');
          button.setAttribute('aria-selected', 'false');
          button.textContent = destination.label;
          button.addEventListener('click', () => {
            if (index !== selectedIndex) mountItinerary(index);
          });
          tabsEl.appendChild(button);
        });

        mountItinerary(0);
      });
    </script>
  </body>
</html>
`;

writeFileSync(join(demoDir, 'demo-1-file.html'), html);
console.log('Wrote demo/demo-1-file.html');
