AngularX 相關設定
===============


新增一個 Module
----------------------

### 新增一個 Module 並搭配 Routing Module
```
$ ng g m Pages/CaseManagement --routing
  create src/app/Pages/case-management/case-management-routing.module.ts (257 bytes)
  create src/app/Pages/case-management/case-management.module.ts (312 bytes)
```

### 在 pages-routing.module 加入 Route 規則 
```pages-routing.module.ts
...
  {
    path: 'case-management',
    loadChildren: './case-management/case-management.module#CaseManagementModule',
  },
...  
```

新增一個 Component
----------------------

### 新增一個 Component 並搭配 prefix
```
ng g c Pages/CaseManagement -p ngx
  create src/app/Pages/case-management/case-management.component.html (34 bytes)
  create src/app/Pages/case-management/case-management.component.spec.ts (685 bytes)
  create src/app/Pages/case-management/case-management.component.ts (305 bytes)
  create src/app/Pages/case-management/case-management.component.scss (0 bytes)
  update src/app/Pages/case-management/case-management.module.ts (406 bytes)
```

### 在 case-management.module 修改 declarations
```
const components = [
  CaseManagementComponent,
]
```

### 修改 case-management.component.html

```case-management.component.html
<router-outlet></router-outlet>
```

### 在 case-management-routing.module 加入子 Route 規則 
```
const routes: Routes = [{
  path: '',
  component: CaseManagementComponent
}];
```

### 新增一個子 Component 並搭配 prefix

```
$ ng g c Pages/CaseManagement/Cases -p ngx
  create src/app/Pages/case-management/cases/cases.component.html (24 bytes)
  create src/app/Pages/case-management/cases/cases.component.spec.ts (621 bytes)
  create src/app/Pages/case-management/cases/cases.component.ts (266 bytes)
  create src/app/Pages/case-management/cases/cases.component.scss (0 bytes)
  update src/app/Pages/case-management/case-management.module.ts (609 bytes)
```

### 在 case-management.module 修改 declarations
```
const components = [
  CasesComponent,
  CaseManagementComponent,
]
```

### 在 case-management-routing.module 修改子 Route 規則 
```
const routes: Routes = [{
  path: '',
  component: CaseManagementComponent,
  children: [{
    path: 'cases',
    component: CasesComponent,
  }],
}];
```
