import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { PokemeonService } from '../../pokemeon.service';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { Pokemon } from '../../pokemon.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card{cursor:pointer}`,
})
export class PokemonListComponent {
  readonly #pokemonService = inject(PokemeonService);
  readonly pokemonList = signal(this.#pokemonService.getPokemonList());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList();
    return pokemonList.filter((x) =>
      x.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  });

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }

    if (pokemon.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  }
}
