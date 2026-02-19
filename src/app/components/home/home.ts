import { Component, OnInit } from '@angular/core';
import { Posts } from '../../services/posts';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  posts: post[] = [];

  constructor(private postService: Posts) {}
  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    console.log(this.posts);
  }
}
