
export class BaseEntity {
  id: number;
  version: number;
  createdDate: number;
  lastModifiedDate: number;
  createBy: string;
  lastModifiedBy: string;
}

export class User extends BaseEntity {
  constructor() {
    super();
  }
  username: string; // 帳號
  name: string; // 姓名
  gender: string; // 性別
  enabled: boolean;
  role: string;
  lastPasswordResetDate: Date;
}

