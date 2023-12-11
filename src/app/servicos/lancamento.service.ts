import { Lancamento } from './../modelos/lancamento';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class LancamentoService implements OnInit {

  constructor(private fs: AngularFirestore, private ts: ToastrService) { }
  ngOnInit(): void {

  }
  async saveData(lcto: Lancamento){

    const res = await this.fs.collection('lancamentos').add(lcto).then(docRef =>{
    this.ts.success('Lançamento gravado com sucesso!')});



}




}
