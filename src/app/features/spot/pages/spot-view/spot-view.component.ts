import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {mockSpotList} from '../../../map/models/mockSpotList';
import Spot from '../../../map/models/Spot';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-spot-view',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './spot-view.component.html',
  styleUrl: './spot-view.component.scss'
})
export class SpotViewComponent implements OnDestroy, OnInit {

  id: number | undefined;
  private sub: any;
  spot?: Spot;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

    });

    this.spot = mockSpotList.find(value => value.id === this.id);

    // TODO: Redirect to 404 page
    if(!this.spot){
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
