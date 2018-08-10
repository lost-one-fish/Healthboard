import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { SmartContext } from '../../../@fhir/smart-context';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  isAuthenticated: boolean;

  userMenu = [{title: '個人資訊', link: '/pages/user/profile'}, {title: '登出', link: '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private smartContext: SmartContext) {
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(auth => {
      this.isAuthenticated = auth;
    });
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        this.user = token.getPayload();
      }
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  redirectLogin() {
    this.router.navigate(['auth/login']);
  }

  update(url) {
    this.smartContext.baseUrl = url;
  }
}
