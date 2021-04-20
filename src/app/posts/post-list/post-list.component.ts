import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(private ps: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ps.getPosts();
    this.postsSub = this.ps
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.ps.deletePost(id);
  }
}
