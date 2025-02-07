import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitElementComponent } from './components/wait-element/wait-element.component';
import { RxjsRoutingModule } from './rxjs-routing.module';

@NgModule({
  declarations: [
    WaitElementComponent,
  ],
  imports: [
    RxjsRoutingModule,
    CommonModule
  ]
})
export class RxjsModule { }
