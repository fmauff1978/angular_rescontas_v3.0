import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { cartaoparcelado } from '../modelos/cartaoparcelado';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';

@Component({
  selector: 'app-cartaoparcelado-list',
  templateUrl: './cartaoparcelado-list.component.html',
  styleUrls: ['./cartaoparcelado-list.component.css']
})
export class CartaoparceladoListComponent implements OnInit {
 
  parcelamento$: Observable<cartaoparcelado[]>;


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    async ngOnInit()  {       

       this.parcelamento$ =this.fs.collection('parcelamentos', (ref) => ref.where('ativa','==',true).orderBy('datadacompra', 'desc')).get().pipe(map((result)=> this.convertSnaps<cartaoparcelado>(result)));
               
}

convertSnaps<T>(results){
  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }} 



