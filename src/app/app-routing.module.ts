import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'lib', loadChildren: () => import('./modules/lib/lib.module').then(m => m.LibModule) },
  { path: 'rxjs', loadChildren: () => import('./modules/rxjs/rxjs.module').then(m => m.RxjsModule) },
  { path: 'test', loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule) },
  { path: 'physic', loadChildren: () => import('./modules/physic/physic.module').then(m => m.PhysicModule) },
  { path: '**', redirectTo: 'lib' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
