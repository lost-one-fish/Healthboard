import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/home/index',
    home: true,
    data: {
      permission: 'view',
      resource: 'home',
    },
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: '檢驗值',
    icon: 'fa fa fa-bar-chart',
    link: '/pages/laboratory/index',
    data: {
      permission: 'view',
      resource: 'laboratory',
    },
  },
  {
    title: '病史',
    icon: 'fa fa fa-bar-chart',
    link: '/pages/history/index',
    data: {
      permission: 'view',
      resource: 'history',
    },
  },
  {
    title: '個案管理',
    icon: 'fa fa fa-users',
    link: '/pages/case-management/index',
    data: {
      permission: 'view',
      resource: 'case-management',
    },
  },
  // FIXME: 暫時隱藏 menu item
  // {
  //   title: '個案管理',
  //   icon: 'fa fa fa-users',
  //   data: {
  //     permission: 'view',
  //     resource: 'case-management',
  //   },
  //   children: [
  //     {
  //       icon: 'fa fa-user',
  //       title: '個案資料',
  //       link: '/pages/case-management/index',
  //     },
  //   ],
  // },
  // {
  //   title: '系統設定',
  //   icon: 'fa fa fa-wrench',
  //   link: '/pages/system-settings',
  //   data: {
  //     permission: 'view',
  //     resource: 'system-settings',
  //   },
  //   children: [
  //     {
  //       icon: 'fa fa-user',
  //       title: '帳號管理',
  //       link: '/pages/system-settings/manage-user',
  //     },
  //     {
  //       icon: 'fa fa-key',
  //       title: '密碼變更',
  //       link: '/pages/system-settings/change-password',
  //     },
  //     {
  //       icon: 'fa fa-sitemap',
  //       title: '單位管理',
  //       link: '/pages/system-settings/manage-organization',
  //     },
  //   ],
  // },
];
