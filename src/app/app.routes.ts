import { CanActivate } from '@angular/router';
import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PokemonAddComponent } from './pokemon/pokemon-add/pokemon-add.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion',
  },
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add',
        component: PokemonAddComponent,
        title: 'Ajouter un Pokemon',
      },
      {
        path: 'edit/:id',
        component: PokemonEditComponent,
        title: 'Edition Pokemon',
      },
      {
        path: ':id',
        component: PokemonProfileComponent,
        title: 'Pokemon',
      },
      {
        path: '',
        component: PokemonListComponent,
        title: 'Pokedex',
      },
    ],
  },

  {
    path: '',
    redirectTo: '/pokemons',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
