import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Chart } from '../chart/chart';
import { DateRangeTabs } from '../date-range-tabs/date-range-tabs';
import { Tabs } from '../tabs/tabs';
import {
  ElevationChartPoint,
  ElevationLabels,
  ItineraryDateRange,
  ItineraryDayItem,
  ItineraryTabItem,
} from '../../models/itinerary.models';

interface ResolvedDayItem extends ItineraryDayItem {
  date: Date;
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const EMPTY_LABELS: ElevationLabels = { baseCamp: '', summit: '', baseCity: '' };

@Component({
  selector: 'app-itinerary',
  imports: [Chart, DateRangeTabs, Tabs],
  templateUrl: './itinerary.html',
  styleUrl: './itinerary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Itinerary {
  // Optional (not `input.required`) so this component can also be published as a web
  // component: consumers set properties as JS after the element connects to the DOM,
  // which happens after Angular's first change detection pass.
  readonly dateRanges = input<ItineraryDateRange[]>([]);
  readonly items = input<ItineraryDayItem[]>([]);
  readonly legendLabels = input<ElevationLabels>(EMPTY_LABELS);

  private readonly manuallySelectedRangeIndex = signal<number | null>(null);
  private readonly manuallySelectedDate = signal<Date | null>(null);

  protected readonly showRangeTabs = computed(() => this.dateRanges().length > 1);

  protected readonly selectedRangeIndex = computed<number>(() => {
    const index = this.manuallySelectedRangeIndex();
    return index !== null && index < this.dateRanges().length ? index : 0;
  });

  private readonly selectedRange = computed<ItineraryDateRange | null>(
    () => this.dateRanges()[this.selectedRangeIndex()] ?? null,
  );

  // The day-by-day template resolved against the selected departure's start date.
  private readonly resolvedItems = computed<ResolvedDayItem[]>(() => {
    const range = this.selectedRange();
    if (!range) return [];
    return this.items().map((item) => ({
      ...item,
      date: addDays(range.startDate, item.dayNumber - 1),
    }));
  });

  protected readonly selectedDate = computed<Date | null>(
    () => this.manuallySelectedDate() ?? this.resolvedItems()[0]?.date ?? null,
  );

  protected readonly chartPoints = computed<ElevationChartPoint[]>(() =>
    this.resolvedItems().map((item) => ({
      date: item.date,
      elevation: item.elevation,
      category: item.category,
    })),
  );

  protected readonly tabItems = computed<ItineraryTabItem[]>(() =>
    this.resolvedItems().map((item) => ({
      date: item.date,
      basePlace: item.basePlace,
      title: item.title,
      content: item.content,
      mealsIncluded: item.mealsIncluded,
      acommodationIncluded: item.acommodationIncluded,
    })),
  );

  protected selectRange(index: number): void {
    if (index === this.selectedRangeIndex()) return;
    this.manuallySelectedRangeIndex.set(index);
    // Switching departures resets the day selection back to that departure's first day.
    this.manuallySelectedDate.set(null);
  }

  protected selectDate(date: Date): void {
    const current = this.selectedDate();
    if (current && isSameDate(current, date)) return;
    this.manuallySelectedDate.set(date);
  }
}
