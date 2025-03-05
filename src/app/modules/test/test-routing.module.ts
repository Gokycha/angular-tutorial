import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';

const routes: Routes = [
  { path: 'two-way-binding', component: TwoWayBindingComponent },
  { path: 'text-to-speech', component: TextToSpeechComponent },
  { path: '**', redirectTo: 'two-way-binding' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
