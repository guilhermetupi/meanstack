import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading: boolean;
  private authStatusSub: Subscription;

  constructor(public as: AuthService) {}

  ngOnInit(): void {
    this.authStatusSub = this.as
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        if (authStatus?.error) {
          this.form.get('email').setErrors({ authFailed: true });
          this.form.get('password').setErrors({ authFailed: true });
        }
        this.isLoading = false;
      });
    this.isLoading = false;
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    this.isLoading = true;
    if (this.form.valid) {
      this.as.loginUser(this.form.value.email, this.form.value.password);
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
