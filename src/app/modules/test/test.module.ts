import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { ComponentAComponent } from './components/component-a/component-a.component';
import { ComponentBComponent } from './components/component-b/component-b.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { FormsModule } from '@angular/forms';
import { SendDataService } from '../../services/send-data.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';

@NgModule({
  declarations: [
    ComponentAComponent,
    ComponentBComponent,
    TwoWayBindingComponent,
    TextToSpeechComponent,
  ],
  imports: [
    FormsModule,
    TestRoutingModule,
    CommonModule
  ],
  providers: [
    SendDataService,
    TextToSpeechService,
  ],
})
export class TestModule { }
