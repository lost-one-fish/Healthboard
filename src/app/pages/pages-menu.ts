import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: '個案管理',
    icon: 'fa fa fa-bar-chart',
    link: '/pages/ui-features',
  },
  {
    title: '系統設定',
    icon: 'fa fa fa-wrench',
    link: '/pages/ui-features',
    children: [
      {
        icon: 'fa fa fa-user',
        title: '帳號管理',
      },
      {
        icon: 'fa fa fa-key',
        title: '密碼變更',
      },
    ],
  },
];
