import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BallComponent } from './components/ball/ball.component';

const routes: Routes = [
  { path: 'ball', component: BallComponent },
  { path: '**', redirectTo: 'ball' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicRoutingModule { }
