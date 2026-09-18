import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Itinerary } from './components/itinerary/itinerary';
import { ITINERARY_DESTINATIONS } from './data/itinerary-demo.data';

@Component({
  imports: [Itinerary, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Demo-only: lets this page show several destinations, each with its own Itinerary data.
  // Not part of the Itinerary component itself.
  protected readonly destinations = ITINERARY_DESTINATIONS;

  private readonly selectedDestinationIndex = signal(0);

  protected readonly selectedDestination = computed(
    () => this.destinations[this.selectedDestinationIndex()],
  );

  protected isSelectedDestination(index: number): boolean {
    return index === this.selectedDestinationIndex();
  }

  protected selectDestination(index: number): void {
    this.selectedDestinationIndex.set(index);
  }
}
