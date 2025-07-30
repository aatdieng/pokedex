import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemeonService } from '../../pokemeon.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { getPokemonColor } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemeonService);
  readonly pokemonId = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  ).asReadonly();
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId())
  ).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(this.pokemon().types.map((x) => new FormControl(x))),
  });

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }
  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find((c) => c.value === type);
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      const index = this.pokemonTypeList.controls
        .map((c) => c.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }

  getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {
    return type === 'Electrik' ? 'black' : 'white';
  }
  onSubmit() {}
}
