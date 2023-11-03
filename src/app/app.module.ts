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

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    LancamentosComponent,
    ContasComponent,
    CabecalhoComponent,
    AgregadosComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({"projectId":"contas-27a8b","appId":"1:549391682813:web:541256ea0c386ad9470294","storageBucket":"contas-27a8b.appspot.com","apiKey":"AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU","authDomain":"contas-27a8b.firebaseapp.com","messagingSenderId":"549391682813"}),

    AngularFirestoreModule,
    AppRoutingModule,
    //provideFirebaseApp(() => initializeApp({"projectId":"contas-27a8b","appId":"1:549391682813:web:541256ea0c386ad9470294","storageBucket":"contas-27a8b.appspot.com","apiKey":"AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU","authDomain":"contas-27a8b.firebaseapp.com","messagingSenderId":"549391682813"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    //provideFirebaseApp(() => initializeApp({"projectId":"contas-27a8b","appId":"1:549391682813:web:541256ea0c386ad9470294","storageBucket":"contas-27a8b.appspot.com","apiKey":"AIzaSyCT7opLET0lDWqHM7Yw2FLgzPkn7CJGNcU","authDomain":"contas-27a8b.firebaseapp.com","messagingSenderId":"549391682813"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
