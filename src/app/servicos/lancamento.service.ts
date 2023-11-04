import { Lancamento } from './../modelos/lancamento';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService implements OnInit {

  constructor(private fs: AngularFirestore) { }
  ngOnInit(): void {
   
  }
  async saveData(lcto: Lancamento){

    const res =await this.fs.collection('lancamentos').add(lcto);
    console.log('Documento criado com ID: ', res.id);
}
}
