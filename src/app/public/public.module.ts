import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public.routing.module';


const PublicComponents: any = [
  LoginComponent
];

@NgModule({
  declarations: PublicComponents,
  imports: [
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
