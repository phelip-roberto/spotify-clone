import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageDashboardComponent } from './private-layout/page-dashboard/page-dashboard.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PrivateLayoutComponent,
        // canActivate: [AuthGuardService],
        // canActivateChild: [PermissionsGuardService],
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: PageDashboardComponent,
            data: {
              title: 'Dashboard'
            }
          },
        ],
      }
    ])
  ],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
