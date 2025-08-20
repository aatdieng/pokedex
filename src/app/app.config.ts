import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PokemeonService } from './pokemeon.service';
import { environment } from '../environments/environment.development';
import { PokemonLocalStorageService } from './pokemon-local-storage.service';
import { PokemonJSONServerService } from './pokemon-json-server.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PokemeonService,
      useFactory: pokemonServiceFactory,
    },
  ],
};
export function pokemonServiceFactory(): PokemeonService {
  return environment.production
    ? new PokemonLocalStorageService()
    : new PokemonJSONServerService();
}
