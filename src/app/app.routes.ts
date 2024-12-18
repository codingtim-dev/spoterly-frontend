import {Routes} from '@angular/router';
import {
  AccountDetailsPageComponent
} from './features/account-details/pages/account-details-page/account-details-page.component';
import {MapViewComponent} from './features/map/pages/map-view/map-view.component';
import {SpotViewComponent} from './features/spot/pages/spot-view/spot-view.component';
import {LikedPostsComponent} from './features/account-details/pages/liked-posts/liked-posts.component';
import {LikedSpotsComponent} from './features/account-details/pages/liked-spots/liked-spots.component';
import {StartViewComponent} from './features/start/pages/start-view/start-view.component';
import {UsersPostsComponent} from './features/account-details/pages/users-posts/users-posts.component';

export const routes: Routes = [
  {path: 'home', component: MapViewComponent},
  {path: 'spot/:id', component: SpotViewComponent},
  {path: 'profile/:id', component: AccountDetailsPageComponent},
  {path: 'likedPosts', component: LikedPostsComponent},
  {path: 'usersPosts', component: UsersPostsComponent},
  {path: 'likedSpots', component: LikedSpotsComponent},
  {path: 'start', component: StartViewComponent},

  {path: '', redirectTo: 'start', pathMatch: 'full'},
];
