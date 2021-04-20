import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  @Output() postCreated = new EventEmitter<Post>();
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  constructor(public ps: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.ps.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (!form.invalid) {
      this.isLoading = true;
      if (this.mode === 'create') {
        this.ps.addPosts(form.value.title, form.value.content);
      } else {
        this.ps.updatePost(this.postId, form.value.title, form.value.content);
      }
    }
    form.resetForm();
  }
}
