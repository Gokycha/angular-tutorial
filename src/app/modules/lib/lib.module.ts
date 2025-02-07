import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseEffectComponent } from './components/mouse-effect/mouse-effect.component';
import { LibRoutingModule } from './lib-routing.module';
import { DetectFaceComponent } from './components/detect-face/detect-face.component';
import { AudioMicroComponent } from './components/audio-micro/audio-micro.component';

@NgModule({
  declarations: [
    MouseEffectComponent,
    DetectFaceComponent,
    AudioMicroComponent,
  ],
  imports: [
    CommonModule,
    LibRoutingModule,
  ]
})
export class LibModule { }
