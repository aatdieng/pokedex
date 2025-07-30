import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon, PokemonList } from './pokemon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemeonService {
  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }
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
      'Fee',
    ];
  }
}
