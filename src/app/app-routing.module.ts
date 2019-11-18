import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadQuestoesComponent } from './cad-questoes/cad-questoes.component';
import { ValQuestoesComponent } from './val-questoes/val-questoes.component';
import { BuscaQuestoesComponent } from './busca-questoes/busca-questoes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'cadastro-questao', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro-questao', component: CadQuestoesComponent},
  {path: 'validacao-questao', component: ValQuestoesComponent},
  {path: 'pesquisa-questao', component: BuscaQuestoesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
