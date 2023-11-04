import { CriarAgregadoComponent } from './criar-agregado/criar-agregado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './componentes/contas/contas.component';
import { LancamentosComponent } from './componentes/lancamentos/lancamentos.component';
import { AgregadosComponent } from './componentes/agregados/agregados.component';
import { CriarLancamentoComponent } from './criar-lancamento/criar-lancamento.component';

const routes: Routes = [

  {path: 'contas', component: ContasComponent},
  {path: 'lctos', component: LancamentosComponent},
  {path: 'agregados', component: AgregadosComponent},
  {path: 'criar-agregados', component: CriarAgregadoComponent},
  {path: 'criar-lancamento', component: CriarLancamentoComponent},
  {path: 'lancamentos', component: LancamentosComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
