import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import("../pages/profile/profile.module").then(
            m => m.ProfilePageModule
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
        path: 'feed',
        loadChildren: () =>
          import("../pages/feed/feed.module").then(
            m => m.FeedPageModule
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