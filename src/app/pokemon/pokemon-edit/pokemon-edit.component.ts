import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemeonService } from '../../pokemeon.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';

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

  readonly POKEMON_RULES = POKEMON_RULES;

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(
      this.pokemon().types.map((x) => new FormControl(x)),
      [Validators.required, Validators.maxLength(POKEMON_RULES.MAX_TYPES)]
    ),
  });

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }
  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;
  }
  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  incrementLife() {
    const newLife = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newLife);
  }
  decrementLife() {
    const newLife = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newLife);
  }

  incrementDamage() {
    const newDamage = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newDamage);
  }
  decrementDamage() {
    const newDamage = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newDamage);
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
