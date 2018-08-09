import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { HttpClient } from '@angular/common/http';
import { User } from './model';

@Injectable()
export class UserService extends BasicService<User>  {

  constructor(http: HttpClient) {
    super('User', http);
  }

}
