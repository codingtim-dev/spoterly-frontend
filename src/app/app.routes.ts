import { Routes } from '@angular/router';
import {AppComponent} from './app.component';

export const routes: Routes = [
  //{path: 'home', component:  AppComponent},
  {path: 'spot/:id', component: AppComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
