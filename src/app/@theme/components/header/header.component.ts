import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { ResourceService } from '../../../@fhir/resource.service';
import notify from '../../../../../node_modules/devextreme/ui/notify';

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
              private resourceService: ResourceService) {
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
    this.resourceService.baseUrl = url;
    notify({
      position: {
        at: 'right top',
        offset: '0 95',
      },
      message: 'Base URL 更新為 ' + url,
    });
  }
}
