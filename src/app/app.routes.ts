import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountDetailsPageComponent } from './features/account-details/pages/account-details-page/account-details-page.component';
import { MapViewComponent } from './features/map/pages/map-view/map-view.component';

export const routes: Routes = [
  { path: 'home', component: MapViewComponent },
  { path: 'spot/:id', component: AppComponent },
  { path: 'profile/:id', component: AccountDetailsPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
