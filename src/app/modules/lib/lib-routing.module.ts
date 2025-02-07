import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MouseEffectComponent } from './components/mouse-effect/mouse-effect.component';
import { DetectFaceComponent } from './components/detect-face/detect-face.component';
import { AudioMicroComponent } from './components/audio-micro/audio-micro.component';

const routes: Routes = [
  { path: 'mouse-effect', component: MouseEffectComponent },
  { path: 'detect-face', component: DetectFaceComponent },
  { path: 'audio-micro', component: AudioMicroComponent },
  { path: '**', redirectTo: 'mouse-effect', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibRoutingModule { }
