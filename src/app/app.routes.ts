import {Routes} from '@angular/router';
import {SpotViewComponent} from './features/spot/pages/spot-view/spot-view.component';
import {MapViewComponent} from './features/map/pages/map-view/map-view.component';

export const routes: Routes = [
  {path: 'home', component: MapViewComponent},
  {path: 'spot/:id', component: SpotViewComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
