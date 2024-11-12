import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {mockSpotList} from '../../../map/models/mockSpotList';
import Spot from '../../../map/models/Spot';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import PostModel from '../../../../core/post/PostModel';
import {mockPostList} from '../../../../core/post/mockPostList';
import {MatCard, MatCardContent} from '@angular/material/card';
import {SpotService} from '../../../../services/spot/spot.service';

@Component({
  selector: 'app-spot-view',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf,
    MatCard,
    NgForOf,
    MatCardContent
  ],
  templateUrl: './spot-view.component.html',
  styleUrl: './spot-view.component.scss'
})
export class SpotViewComponent implements OnDestroy, OnInit {

  id: string = "";
  private sub: any;
  spot: any;
  posts?: PostModel[]

  constructor(private spotService: SpotService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id')!;
    })

    console.log(this.id);

    this.spotService.getSpotById(this.id.toString()).subscribe(result => {
      this.spot = result;
      console.log(this.spot);
    });


    // TODO: Redirect to 404 page

  }

  getPosts() {
    // TODO: Create service for fetching posts from database

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
