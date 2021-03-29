import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

const routes: Routes = [
  { path: '',  loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
