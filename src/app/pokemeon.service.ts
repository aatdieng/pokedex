import { HttpClient } from '@angular/common/http';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon, PokemonList } from './pokemon.model';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemeonService {
  readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons/';
  readonly #http = inject(HttpClient);

  getPokemonList(): Observable<PokemonList> {
    return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
  }

  //   getPokemonList(): PokemonList {
  //   return POKEMON_LIST;
  // }
  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find((x) => x.id === id);
    if (!pokemon) {
      throw new Error(`No pokemon found with this id : ${id}`);
    }
    return pokemon;
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Vol',
      'Fée',
    ];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = this.#POKEMON_API_URL + '/' + pokemon.id;
    return this.#http.put<Pokemon>(url, pokemon);
  }

  deletePokemon(id: Number): Observable<void> {
    const url = this.#POKEMON_API_URL + '/' + id;
    return this.#http.delete<void>(url);
  }
}
