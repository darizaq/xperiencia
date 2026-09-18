import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ElevationChartPoint, ElevationItem, ElevationLabels } from '../../models/itinerary.models';

const VIEW_WIDTH = 674;
const VIEW_HEIGHT = 300;
const PLOT_LEFT = 70;
const PLOT_RIGHT = 626;
const PLOT_TOP = 54;
// 10% shorter than the original 290, i.e. the plotted area's height (PLOT_BOTTOM - PLOT_TOP) is reduced by 10%.
const PLOT_BOTTOM = 266;
const TICK_COUNT = 4;
/** Padding added below the lowest and above the highest elevation, as a fraction of their range. */
const DOMAIN_MARGIN_RATIO = 0.05;

const CATEGORY_COLOR: Record<ElevationItem, string> = {
  baseCamp: '#F0F0F0',
  summit: '#F5871F',
  baseCity: '#8C8C8C',
};

const CATEGORY_RADIUS: Record<ElevationItem, number> = {
  baseCamp: 6.5,
  summit: 8,
  baseCity: 6.5,
};

/** Categories whose elevation value is rendered next to the marker. */
const CATEGORIES_WITH_VALUE: ReadonlySet<ElevationItem> = new Set(['baseCamp', 'summit']);

interface ChartScale {
  min: number;
  max: number;
  ticks: number[];
}

interface ChartPointView {
  date: Date;
  category: ElevationItem;
  x: number;
  y: number;
  radius: number;
  color: string;
  value: string | null;
}

interface ChartTick {
  y: number;
  label: string;
}

interface ChartXLabel {
  date: Date;
  x: number;
  day: string;
  monthPrefix: string | null;
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function niceNumber(range: number, round: boolean): number {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / 10 ** exponent;
  let niceFraction: number;

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }

  return niceFraction * 10 ** exponent;
}

/**
 * Domain bounds sit a fixed margin below the lowest and above the highest elevation
 * (proportional to their range), so the plot hugs the data instead of rounding out to
 * distant round numbers. Gridline ticks are still "nice" numbers, but only those that
 * fall within the padded domain are kept.
 */
function computeScale(dataMin: number, dataMax: number, tickCount: number): ChartScale {
  if (dataMin === dataMax) {
    dataMin -= 1;
    dataMax += 1;
  }

  const margin = (dataMax - dataMin) * DOMAIN_MARGIN_RATIO;
  const min = dataMin - margin;
  const max = dataMax + margin;
  const step = niceNumber((max - min) / (tickCount - 1), true);
  const firstTick = Math.ceil(min / step) * step;

  const ticks: number[] = [];
  for (let value = firstTick; value <= max + step / 2; value += step) {
    ticks.push(Math.round(value));
  }

  return { min, max, ticks };
}

function formatElevation(value: number): string {
  return new Intl.NumberFormat('es-ES').format(Math.round(value));
}

function formatMonthShort(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', { month: 'short' })
    .format(date)
    .replace('.', '')
    .toUpperCase();
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chart {
  readonly points = input.required<ElevationChartPoint[]>();
  readonly labels = input.required<ElevationLabels>();
  readonly selectedDate = input<Date | null>(null);

  readonly markerSelected = output<Date>();

  protected readonly viewBox = `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`;
  protected readonly plotLeft = PLOT_LEFT;
  protected readonly plotRight = PLOT_RIGHT;
  protected readonly plotBottom = PLOT_BOTTOM;
  protected readonly xLabelY = PLOT_BOTTOM + 26;
  protected readonly yLabelX = PLOT_LEFT - 12;
  protected readonly unitLabelX = 12;

  protected readonly legendCategories: ElevationItem[] = ['baseCamp', 'summit', 'baseCity'];

  private readonly scale = computed<ChartScale>(() => {
    const elevations = this.points().map((point) => point.elevation);
    return computeScale(Math.min(...elevations), Math.max(...elevations), TICK_COUNT);
  });

  private readonly xPositions = computed<number[]>(() => {
    const total = this.points().length;
    if (total <= 1) return [(PLOT_LEFT + PLOT_RIGHT) / 2];
    const step = (PLOT_RIGHT - PLOT_LEFT) / (total - 1);
    return this.points().map((_, index) => PLOT_LEFT + index * step);
  });

  protected readonly ticks = computed<ChartTick[]>(() => {
    const { min, max, ticks } = this.scale();
    return ticks.map((value) => ({
      y: this.valueToY(value, min, max),
      label: formatElevation(value),
    }));
  });

  protected readonly chartPoints = computed<ChartPointView[]>(() => {
    const { min, max } = this.scale();
    return this.points().map((point, index) => ({
      date: point.date,
      category: point.category,
      x: this.xPositions()[index],
      y: this.valueToY(point.elevation, min, max),
      radius: CATEGORY_RADIUS[point.category],
      color: CATEGORY_COLOR[point.category],
      value: CATEGORIES_WITH_VALUE.has(point.category) ? formatElevation(point.elevation) : null,
    }));
  });

  protected readonly areaPath = computed<string>(() => {
    const pts = this.chartPoints();
    if (!pts.length) return '';
    const top = pts.map((p) => `${p.x},${p.y}`).join(' ');
    const first = pts[0];
    const last = pts[pts.length - 1];
    return `${first.x},${PLOT_BOTTOM} ${top} ${last.x},${PLOT_BOTTOM}`;
  });

  protected readonly linePath = computed<string>(() =>
    this.chartPoints()
      .map((p) => `${p.x},${p.y}`)
      .join(' '),
  );

  protected readonly xLabels = computed<ChartXLabel[]>(() => {
    const points = this.points();
    return points.map((point, index) => {
      const previous = index > 0 ? points[index - 1].date : null;
      const monthChanged = previous !== null && previous.getMonth() !== point.date.getMonth();
      const showPrefix = index === 0 || monthChanged;
      return {
        date: point.date,
        x: this.xPositions()[index],
        day: point.date.getDate().toString().padStart(2, '0'),
        monthPrefix: showPrefix ? formatMonthShort(point.date) : null,
      };
    });
  });

  protected readonly selectedIndex = computed<number>(() => {
    const selected = this.selectedDate();
    if (!selected) return -1;
    return this.points().findIndex((point) => isSameDate(point.date, selected));
  });

  protected readonly selectedPoint = computed<ChartPointView | null>(() => {
    const index = this.selectedIndex();
    return index === -1 ? null : this.chartPoints()[index];
  });

  protected legendLabel(category: ElevationItem): string {
    return this.labels()[category];
  }

  protected legendColor(category: ElevationItem): string {
    return CATEGORY_COLOR[category];
  }

  protected isSelected(index: number): boolean {
    return index === this.selectedIndex();
  }

  protected selectMarker(date: Date): void {
    this.markerSelected.emit(date);
  }

  private valueToY(value: number, min: number, max: number): number {
    const ratio = (value - min) / (max - min);
    return PLOT_BOTTOM - ratio * (PLOT_BOTTOM - PLOT_TOP);
  }
}
