import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {mockSpotList} from '../../../map/models/mockSpotList';
import Spot from '../../../map/models/Spot';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import PostModel from '../../../../core/post/PostModel';
import {mockPostList} from '../../../../core/post/mockPostList';
import {MatCard, MatCardContent} from '@angular/material/card';

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

  id?: number;
  private sub: any;
  spot?: Spot;
  posts?: PostModel[]

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

    this.getPosts()
  }

  getPosts() {
    // TODO: Create service for fetching posts from database

    this.posts = mockPostList.filter(value => value.spotId === this.id);
    console.log(this.posts);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
