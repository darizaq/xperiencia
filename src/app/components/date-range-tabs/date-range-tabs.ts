import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ItineraryDateRange } from '../../models/itinerary.models';

// Registered here (rather than app-wide via LOCALE_ID) so the `es` DatePipe format below
// works regardless of whether this component ends up in the main app or the web-component
// bundle, without changing either entry point's global locale.
registerLocaleData(localeEs);

/** Tabs to pick which available departure (date range) of the itinerary to display. */
@Component({
  selector: 'app-date-range-tabs',
  imports: [DatePipe],
  templateUrl: './date-range-tabs.html',
  styleUrl: './date-range-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeTabs {
  readonly ranges = input<ItineraryDateRange[]>([]);
  readonly selectedIndex = input(0);

  readonly rangeSelected = output<number>();

  protected isSelected(index: number): boolean {
    return index === this.selectedIndex();
  }

  protected selectRange(index: number): void {
    if (index === this.selectedIndex()) return;
    this.rangeSelected.emit(index);
  }
}
