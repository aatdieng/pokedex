import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemeonService } from '../../pokemeon.service';
import { DatePipe } from '@angular/common';
import { getPokemonColor } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
})
export class PokemonProfileComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemeonService);

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));

  readonly pokemon = signal(
    this.#pokemonService.getPokemonById(this.#pokemonId)
  );

   getPokemonColor(type: string): string {
      return getPokemonColor(type);
    }

    getChipTextColor(type: string): 'black' | 'white' {
      return type === 'Electrik' ? 'black' : 'white';
    }
}
 