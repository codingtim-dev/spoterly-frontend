import {Routes} from '@angular/router';
import {
  AccountDetailsPageComponent
} from './features/account-details/pages/account-details-page/account-details-page.component';
import {MapViewComponent} from './features/map/pages/map-view/map-view.component';
import {SpotViewComponent} from './features/spot/pages/spot-view/spot-view.component';

export const routes: Routes = [
  {path: 'home', component: MapViewComponent},
  {path: 'spot/:id', component: SpotViewComponent},
  {path: 'profile/:id', component: AccountDetailsPageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
