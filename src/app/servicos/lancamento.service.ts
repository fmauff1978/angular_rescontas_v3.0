import { Lancamento } from './../modelos/lancamento';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FieldValue, Timestamp, increment } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService implements OnInit {
  res: any;



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
debito.update({saldo: increment(valor)})
debito.update({log: Timestamp.now()});
}

creditar(id2, valor){
  let debito = this.fs.collection('contas').doc(id2);
  debito.update({saldo: increment((-1)*valor)});
  debito.update({log: Timestamp.now()});
  }

  atualizarativo ( valor){
    let debito = this.fs.collection('agregados').doc('UQaBjTeHnn0OFKsWqL1b');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});

  }

  atualizarpassivo ( valor){
    let debito = this.fs.collection('agregados').doc('5sZmf4Rb1XJSelYK4yWw');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});

  }

  atualizarresultado ( valor){
    let debito = this.fs.collection('agregados').doc('XRmnPtKzi8VJQA6SmWLD');
    debito.update({saldo_atual:(valor)});
    debito.update({log: (new Date())})
  }

  atualizardespesatotal ( valor){
    let debito = this.fs.collection('agregados').doc('lBxGgx2QkBC1ZnVVVndY');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});
  }

  atualizarreceitatotal ( valor){
    let debito = this.fs.collection('agregados').doc('Ugi07FMMNu2c7xyAlJDz');
    debito.update({saldo_atual:(valor)});
    debito.update({log: Timestamp.now()});
  }

  debitarbucketger(valor){
    let debito = this.fs.collection('sub_agregados').doc('69pkU9qFFRR57xRLnBvi');
    debito.update({saldo_atual: increment(valor)});
    debito.update({log: Timestamp.now()});

  }

debitarbucketcomp(valor){
  let debito = this.fs.collection('sub_agregados').doc('9W8ZVFbgQkkwCpAjEY8b');
  debito.update({saldo_atual: increment(valor)});
  debito.update({log: Timestamp.now()});
}

creditarbucketger(valor){
  let debito = this.fs.collection('sub_agregados').doc('69pkU9qFFRR57xRLnBvi');
  debito.update({saldo_atual: increment((-1)*valor)});
  debito.update({log: Timestamp.now()});
}

creditarbucketcomp(valor){
let debito = this.fs.collection('sub_agregados').doc('9W8ZVFbgQkkwCpAjEY8b');
debito.update({saldo_atual: increment((-1)*valor)});
debito.update({log: Timestamp.now()});
}

debitarbucketoff(valor){
  let debito = this.fs.collection('sub_agregados').doc('OYGBZIs2mVu43LuFptr1');
  debito.update({saldo_atual: increment(valor)});
  debito.update({log: Timestamp.now()});
}

creditarbucketoff(valor){
  let debito = this.fs.collection('sub_agregados').doc('OYGBZIs2mVu43LuFptr1');
  debito.update({saldo_atual: increment((-1)*valor)});
  debito.update({log: Timestamp.now()});
}

atualizarkpi(valor){

  let debito = this.fs.collection('kpi').doc('0zTTIHm8J15Yj0vCBEjy');
  debito.update({realizado: (valor)});
  debito.update({log: Timestamp.now()});


}




}

