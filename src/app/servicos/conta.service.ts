import { Conta } from 'src/app/modelos/conta';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private fs: AngularFirestore) { }

  async saveData(conta: Conta){

    const res =await this.fs.collection('contas').add(conta);
    console.log('Documento criado com ID: ', res.id);
  
  }
}
