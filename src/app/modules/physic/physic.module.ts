import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallComponent } from './components/ball/ball.component';
import { PhysicRoutingModule } from './physic-routing.module';



@NgModule({
  declarations: [
    BallComponent,
  ],
  imports: [
    CommonModule,
    PhysicRoutingModule,
  ]
})
export class PhysicModule { }
