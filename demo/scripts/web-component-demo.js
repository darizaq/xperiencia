// Demo-only: lets this page switch between destinations, each with its own Itinerary
// data (dateRanges + items). Not part of the `xperiencia-itinerary` component itself.
const DESTINATIONS = [
  { key: 'ecuador', label: 'Ecuador' },
  { key: 'bolivia', label: 'Bolivia' },
  { key: 'peru', label: 'Perú' },
];

// JSON has no Date type, so each "YYYY-MM-DD" string is parsed back into a local Date
// here (rather than `new Date(string)`, which parses as UTC and can shift a day off).
function toLocalDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

async function loadDestinationData(key) {
  const [dateRanges, items, legendLabels] = await Promise.all([
    fetch(`data/${key}/date-ranges.json`).then((res) => res.json()),
    fetch(`data/${key}/itinerary-items.json`).then((res) => res.json()),
    fetch(`data/${key}/elevation-labels.json`).then((res) => res.json()),
  ]);
  return {
    dateRanges: dateRanges.map((range) => ({
      startDate: toLocalDate(range.startDate),
      endDate: toLocalDate(range.endDate),
    })),
    // `items` is the day-by-day template (relative `dayNumber`, not an absolute date),
    // shared across every date range — the component resolves it against whichever
    // range is selected.
    items,
    // `baseCamp`/`summit` wording is the same everywhere; only `baseCity` differs per
    // destination (e.g. "Descanso en La Paz" vs. "Descanso en Huaraz"), so each
    // destination carries its own legend labels rather than a single shared file.
    legendLabels,
  };
}

customElements.whenDefined('xperiencia-itinerary').then(async () => {
  const tabsEl = document.getElementById('destination-tabs');
  const containerEl = document.getElementById('itinerary-container');

  const destinationData = await Promise.all(
    DESTINATIONS.map((destination) => loadDestinationData(destination.key)),
  );

  let selectedIndex = 0;

  // Rebuilds the `<xperiencia-itinerary>` element from scratch instead of just re-setting
  // its properties, so switching destinations also resets its own internal state (selected
  // date range / day) rather than carrying over a selection that may not exist in the new
  // destination's data.
  function mountItinerary(index) {
    selectedIndex = index;

    containerEl.replaceChildren();
    const el = document.createElement('xperiencia-itinerary');
    containerEl.appendChild(el);

    el.legendLabels = destinationData[index].legendLabels;
    el.dateRanges = destinationData[index].dateRanges;
    el.items = destinationData[index].items;

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
