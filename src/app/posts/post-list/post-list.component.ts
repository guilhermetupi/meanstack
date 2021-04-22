import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  postsPerPageOptions = [2, 5, 10];

  constructor(private ps: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ps.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.ps
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.ps.deletePost(id).subscribe(() => {
      this.ps.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(e: PageEvent) {
    this.isLoading = true;
    this.currentPage = e.pageIndex + 1;
    this.postsPerPage = e.pageSize;
    this.ps.getPosts(this.postsPerPage, this.currentPage);
  }
}
