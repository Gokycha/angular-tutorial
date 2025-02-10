import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallComponent } from './components/ball/ball.component';
import { PhysicRoutingModule } from './physic-routing.module';
import { PendulumComponent } from './components/pendulum/pendulum.component';



@NgModule({
  declarations: [
    BallComponent,
    PendulumComponent,
  ],
  imports: [
    CommonModule,
    PhysicRoutingModule,
  ]
})
export class PhysicModule { }
