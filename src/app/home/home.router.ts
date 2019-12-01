import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import("../pages/welcome/welcome.module").then(
            m => m.WelcomePageModule
          )
      },
      {
        path: 'checktime',
        loadChildren: () =>
          import("../pages/checktime/checktime.module").then(
            m => m.ChecktimePageModule
          )
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import("../pages/notifications/notifications.module").then(
            m => m.NotificationsPageModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import("../pages/settings/settings.module").then(
            m => m.SettingsPageModule
          )
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild (routes)],
    exports: [RouterModule]
})

export class HomeRouter {}