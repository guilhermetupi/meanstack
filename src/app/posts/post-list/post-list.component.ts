import { AuthService } from './../../services/auth.service';
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
  private statusSub: Subscription;
  private userId: string;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  postsPerPageOptions = [2, 5, 10];
  isAuthenticated: boolean = false;

  constructor(private ps: PostsService, private as: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.ps.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.as.getUserId();
    this.postsSub = this.ps
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
    this.isAuthenticated = this.as.getIsAuth();
    this.statusSub = this.as
      .getAuthStatusListener()
      .subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
        this.userId = this.as.getUserId();
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.statusSub.unsubscribe();
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

  isCreator(idx: number) {
    return this.userId === this.posts[idx].creator;
  }
}
