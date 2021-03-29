import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaClienteComponent } from './area-cliente/area-cliente.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'acesso', component: AreaClienteComponent},
  {path: 'cadastro', component: CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
