import { environment } from './../environments/environment';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { NgModule } from '@angular/core';
import { AngularFireModule} from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregadosComponent } from './componentes/agregados/agregados.component';
import { LancamentosComponent } from './componentes/lancamentos/lancamentos.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { ContasComponent } from './componentes/contas/contas.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriarAgregadoComponent } from './criar-agregado/criar-agregado.component';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { CriarLancamentoComponent } from './criar-lancamento/criar-lancamento.component';
import { AtivoComponent } from './contas/ativo/ativo.component';
import { PassivoComponent } from './contas/passivo/passivo.component';
import { DespesasComponent } from './contas/despesas/despesas.component';
import { ReceitasComponent } from './contas/receitas/receitas.component';
import { ResultadoComponent } from './contas/resultado/resultado.component';

import { RazaoComponent } from './contas/razao/razao.component';
import { BucketComponent } from './componentes/contas/bucket/bucket.component';
import { DshComponent } from './dsh/dsh.component';
import { CartaoparceladoComponent } from './cartaoparcelado/cartaoparcelado.component';
import { CartaoparceladoListComponent } from './cartaoparcelado-list/cartaoparcelado-list.component';
import { TesteComponent } from './cartaoparcelado/teste/teste.component';
import { CdcComponent } from './cdc/cdc.component';
import { CdcCriarComponent } from './cdc-criar/cdc-criar.component';




registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    LancamentosComponent,
    ContasComponent,
    CabecalhoComponent,
    AgregadosComponent,
    CriarAgregadoComponent,
    CriarLancamentoComponent,
    AtivoComponent,
    PassivoComponent,
    DespesasComponent,
    ReceitasComponent,
    ResultadoComponent,

    RazaoComponent,
    BucketComponent,
    DshComponent,
    CartaoparceladoComponent,
    CartaoparceladoListComponent,
    TesteComponent,
    CdcComponent,
    CdcCriarComponent

  ],
  imports: [
    BrowserModule,
     ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({"projectId":"contas-27a8b","appId":"1:549391682813:web:541256ea0c386ad9470294","storageBucket":"contas-27a8b.appspot.com","apiKey":"AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU","authDomain":"contas-27a8b.firebaseapp.com","messagingSenderId":"549391682813"}),

    AngularFirestoreModule,
    AppRoutingModule,
    //provideFirebaseApp(() => initializeApp({"projectId":"contas-27a8b","appId":"1:549391682813:web:541256ea0c386ad9470294","storageBucket":"contas-27a8b.appspot.com","apiKey":"AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU","authDomain":"contas-27a8b.firebaseapp.com","messagingSenderId":"549391682813"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    //provideFirebaseApp(() => initializeApp({"projectId":"contas-27a8b","appId":"1:549391682813:web:541256ea0c386ad9470294","storageBucket":"contas-27a8b.appspot.com","apiKey":"AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU","authDomain":"contas-27a8b.firebaseapp.com","messagingSenderId":"549391682813"}))
  ],
  providers: [{provide: LOCALE_ID,useValue:'pt'},{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
