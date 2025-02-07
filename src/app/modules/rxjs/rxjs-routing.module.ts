import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitElementComponent } from './components/wait-element/wait-element.component';

const routes: Routes = [
  { path: 'wait-element', component: WaitElementComponent },
  { path: '**', redirectTo: 'wait-element' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
