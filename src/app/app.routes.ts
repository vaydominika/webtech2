import { Routes } from '@angular/router';
import { CatListComponent } from './components/cat-list/cat-list';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { 
    path: '', 
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'cats', pathMatch: 'full' },
      { path: 'cats', component: CatListComponent },
      { path: 'people', loadComponent: () => import('./components/person-list/person-list').then(m => m.PersonListComponent) },
    ]
  },
  { path: '**', redirectTo: 'cats' }
];
