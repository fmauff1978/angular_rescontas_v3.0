import { Lancamento } from './../modelos/lancamento';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FieldValue, Timestamp } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';

import { increment, serverTimestamp } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class LancamentoService implements OnInit {

  constructor(private fs: AngularFirestore, private ts: ToastrService, private router: Router) { }
  ngOnInit(): void {

  }
  async saveData(lcto: Lancamento){

    const res = await this.fs.collection('lancamentos').add(lcto).then(docRef =>{
    this.ts.success('Lançamento gravado com sucesso!')});
    this.router.navigate(['/lctos'])


}

debitar(id, valor){

let debito = this.fs.collection('contas').doc(id);

debito.update({saldo: increment(valor)});

}

creditar(id2, valor){

  let debito = this.fs.collection('contas').doc(id2);

  debito.update({saldo: increment((-1)*valor)});

  }

  atualizarativo ( valor){


    let debito = this.fs.collection('agregados').doc('UQaBjTeHnn0OFKsWqL1b');

    debito.update({saldo_atual:(valor)});
    debito.update({log: (new Date())})


  }

  atualizarpassivo ( valor){


    let debito = this.fs.collection('agregados').doc('5sZmf4Rb1XJSelYK4yWw');

    debito.update({saldo_atual:(valor)});
    debito.update({log: (new Date())})


  }


  atualizarresultado ( valor){


    let debito = this.fs.collection('agregados').doc('XRmnPtKzi8VJQA6SmWLD');

    debito.update({saldo_atual:(valor)});
    debito.update({log: (new Date())})


  }

  atualizardespesatotal ( valor){


    let debito = this.fs.collection('agregados').doc('lBxGgx2QkBC1ZnVVVndY');

    debito.update({saldo_atual:(valor)});
    debito.update({log: (new Date())})


  }

  atualizarreceitatotal ( valor){


    let debito = this.fs.collection('agregados').doc('Ugi07FMMNu2c7xyAlJDz');

    debito.update({saldo_atual:(valor)});
    debito.update({log: (new Date())})


  }








}
