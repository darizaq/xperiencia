/** Category of a day within the elevation profile / itinerary. */
export type ElevationItem = 'baseCamp' | 'summit' | 'baseCity';

/**
 * One available departure of the itinerary (the same day-by-day plan can be offered
 * several times a year, each time over a different date range).
 */
export interface ItineraryDateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Full definition of a day of the itinerary template, as provided to the `Itinerary`
 * component. `dayNumber` (1-based, relative to a date range's `startDate`) replaces an
 * absolute date so the same template can be resolved against any selected departure.
 */
export interface ItineraryDayItem {
  dayNumber: number;
  elevation: number;
  category: ElevationItem;
  basePlace: string;
  title: string;
  content: string;
  mealsIncluded?: boolean;
  acommodationIncluded?: boolean;
}

/** Labels used for the elevation chart legend, keyed by category. */
export type ElevationLabels = Record<ElevationItem, string>;

/** Subset of `ItineraryDayItem` consumed by the `Chart` component. */
export interface ElevationChartPoint {
  date: Date;
  elevation: number;
  category: ElevationItem;
}

/** Subset of `ItineraryDayItem` consumed by the `Tabs` component. */
export interface ItineraryTabItem {
  date: Date;
  basePlace: string;
  title: string;
  content: string;
  mealsIncluded?: boolean;
  acommodationIncluded?: boolean;
}
