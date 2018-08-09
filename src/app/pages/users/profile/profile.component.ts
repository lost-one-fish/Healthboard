import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { BodyOutputType, ToasterConfig, ToasterService } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'flyLeft',
    limit: 3,
    bodyOutputType: BodyOutputType.TrustedHtml,
  });

  data: any;
  user: string; // From Token Information

  constructor(private authService: NbAuthService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {

    // 取得 JWT 中的 User.id。
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          // here we receive a payload from the token and assigne it to our `user` variable
          this.user = token.getPayload();
          // 利用 User.id 向 API 請求個人資料。
        }
      });
  }
}
