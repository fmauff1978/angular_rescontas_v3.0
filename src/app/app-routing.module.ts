import { CartaoparceladoListComponent } from './cartaoparcelado-list/cartaoparcelado-list.component';
import { CartaoparceladoComponent } from './cartaoparcelado/cartaoparcelado.component';
import { ReceitasComponent } from './contas/receitas/receitas.component';
import { DespesasComponent } from './contas/despesas/despesas.component';
import { PassivoComponent } from './contas/passivo/passivo.component';
import { CriarAgregadoComponent } from './criar-agregado/criar-agregado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './componentes/contas/contas.component';
import { LancamentosComponent } from './componentes/lancamentos/lancamentos.component';
import { AgregadosComponent } from './componentes/agregados/agregados.component';
import { CriarLancamentoComponent } from './criar-lancamento/criar-lancamento.component';
import { AtivoComponent } from './contas/ativo/ativo.component';
import { ResultadoComponent } from './contas/resultado/resultado.component';
import { RazaoComponent } from './contas/razao/razao.component';
import { BucketComponent } from './componentes/contas/bucket/bucket.component';

const routes: Routes = [

  {path: 'contas', component: ContasComponent},
  {path: 'lctos', component: LancamentosComponent},
  {path: 'agregados', component: AgregadosComponent},
  {path: 'criar-agregados', component: CriarAgregadoComponent},
  {path: 'criar-lancamento', component: CriarLancamentoComponent},
  {path: 'lancamentos', component: LancamentosComponent},
  {path: 'ativo', component: AtivoComponent},
  {path: 'passivo', component: PassivoComponent},
  {path: 'despesas', component: DespesasComponent},
  {path: 'receitas', component: ReceitasComponent},
  {path: 'resultado', component: ResultadoComponent},
  {path: 'razao', component: RazaoComponent},
  {path: 'bucket', component: BucketComponent},
  {path: 'parcelado', component: CartaoparceladoComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
