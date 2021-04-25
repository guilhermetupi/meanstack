import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading: boolean;
  private authStatusSub: Subscription;

  constructor(public as: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authStatusSub = this.as
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        if (authStatus?.error?.error?.errors?.email?.kind === 'unique')
          this.form.get('email').setErrors({ emailInUse: true });
        this.isLoading = false;
      });
    this.isLoading = false;
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignup() {
    this.isLoading = true;
    if (this.form.valid) {
      if (
        this.form.get('password').value !==
        this.form.get('passwordConfirm').value
      ) {
        this.form.get('passwordConfirm').setErrors({ unmatch: true });
      } else {
        this.as.createUser(this.form.value.email, this.form.value.password);
      }
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
