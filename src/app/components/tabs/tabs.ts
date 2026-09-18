import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IconTooltip } from '../icon-tooltip/icon-tooltip';
import { ItineraryTabItem } from '../../models/itinerary.models';

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

@Component({
  selector: 'app-tabs',
  imports: [IconTooltip],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs {
  readonly items = input.required<ItineraryTabItem[]>();
  readonly selectedDate = input<Date | null>(null);

  readonly tabSelected = output<Date>();

  protected readonly selectedIndex = computed<number>(() => {
    const selected = this.selectedDate();
    if (!selected) return 0;
    const index = this.items().findIndex((item) => isSameDate(item.date, selected));
    return index === -1 ? 0 : index;
  });

  protected readonly selectedItem = computed<ItineraryTabItem | null>(() => {
    const items = this.items();
    return items.length ? items[this.selectedIndex()] : null;
  });

  protected dayNumber(date: Date): string {
    return date.getDate().toString().padStart(2, '0');
  }

  protected monthShort(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', { month: 'short' })
      .format(date)
      .replace('.', '')
      .toUpperCase();
  }

  protected isSelected(index: number): boolean {
    return index === this.selectedIndex();
  }

  protected selectTab(item: ItineraryTabItem): void {
    this.tabSelected.emit(item.date);
  }

  protected onTabKeydown(event: KeyboardEvent, index: number): void {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();

    const items = this.items();
    const nextIndex = (index + step + items.length) % items.length;
    this.tabSelected.emit(items[nextIndex].date);

    const tabButtons = (event.currentTarget as HTMLElement)?.parentElement?.querySelectorAll<HTMLElement>(
      '.tabs__tab',
    );
    tabButtons?.[nextIndex]?.focus();
  }
}
