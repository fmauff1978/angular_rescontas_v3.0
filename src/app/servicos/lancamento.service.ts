import { Lancamento } from './../modelos/lancamento';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FieldValue } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';

import { increment } from '@angular/fire/firestore';



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




}
