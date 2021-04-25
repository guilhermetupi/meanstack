import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authListenerSubs: Subscription;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.as.getIsAuth();
    this.authListenerSubs = this.as
      .getAuthStatusListener()
      .subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
      });
  }

  onLogout() {
    this.as.logoutUser();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
