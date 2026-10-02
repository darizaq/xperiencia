// Ecuador-only demo: single destination, so no destination switcher — just fetch its
// data and mount the `xperiencia-itinerary` element once.

// JSON has no Date type, so each "YYYY-MM-DD" string is parsed back into a local Date
// here (rather than `new Date(string)`, which parses as UTC and can shift a day off).
function toLocalDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

customElements.whenDefined('xperiencia-itinerary').then(async () => {
  const containerEl = document.getElementById('itinerary-container');

  const [dateRanges, items, legendLabels] = await Promise.all([
    fetch('data/date-ranges.json').then((res) => res.json()),
    fetch('data/itinerary-items.json').then((res) => res.json()),
    fetch('data/elevation-labels.json').then((res) => res.json()),
  ]);

  const el = document.createElement('xperiencia-itinerary');
  containerEl.appendChild(el);

  el.legendLabels = legendLabels;
  el.dateRanges = dateRanges.map((range) => ({
    startDate: toLocalDate(range.startDate),
    endDate: toLocalDate(range.endDate),
  }));
  // `items` is the day-by-day template (relative `dayNumber`, not an absolute date),
  // shared across every date range — the component resolves it against whichever
  // range is selected.
  el.items = items;
});
