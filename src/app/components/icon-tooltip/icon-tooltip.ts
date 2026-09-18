import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** An icon button that shows a text tooltip on hover/focus, and can render "dimmed". */
@Component({
  selector: 'app-icon-tooltip',
  templateUrl: './icon-tooltip.html',
  styleUrl: './icon-tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTooltip {
  readonly tooltip = input.required<string>();
  readonly dim = input(false);
}
