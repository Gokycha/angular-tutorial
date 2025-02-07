import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentBComponent } from './components/component-b/component-b.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { FormsModule } from '@angular/forms';
import { SendDataService } from '../../services/send-data.service';

@NgModule({
  declarations: [
    ComponentAComponent,
    ComponentBComponent,
    TwoWayBindingComponent,
  ],
  imports: [
    FormsModule,
    TestRoutingModule,
    CommonModule
  ],
  providers: [SendDataService],
})
export class TestModule { }
