import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { Itinerary } from './app/components/itinerary/itinerary';

/**
 * Bundles the itinerary as a framework-agnostic `<xperiencia-itinerary>` web component.
 * `items` and `legendLabels` are plain object/array inputs (not attributes), so they must
 * be set as JS properties, e.g. `document.querySelector('xperiencia-itinerary').items = [...]`.
 */
createApplication({
  providers: [provideBrowserGlobalErrorListeners()],
}).then((appRef) => {
  const itineraryElement = createCustomElement(Itinerary, { injector: appRef.injector });
  customElements.define('xperiencia-itinerary', itineraryElement);
});
