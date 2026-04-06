import { Routes } from '@angular/router';
import { CatListComponent } from './components/cat-list/cat-list';

export const routes: Routes = [
  { path: '', redirectTo: 'cats', pathMatch: 'full' },
  { path: 'cats', component: CatListComponent },
  { path: 'people', loadComponent: () => import('./components/person-list/person-list').then(m => m.PersonListComponent) },
];
