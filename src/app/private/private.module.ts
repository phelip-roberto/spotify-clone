import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PageDashboardComponent } from './private-layout/page-dashboard/page-dashboard.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { PrivateRoutingModule } from './private.routing.module';


const PrivateComponents: any = [
  PrivateLayoutComponent,
  PageDashboardComponent
];

@NgModule({
  declarations: PrivateComponents,
  imports: [
    SharedModule,
    PrivateRoutingModule,
  ]
})
export class PrivateModule { }
