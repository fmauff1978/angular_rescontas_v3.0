import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { cartaoparcelado } from '../modelos/cartaoparcelado';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-cartaoparcelado-list',
  templateUrl: './cartaoparcelado-list.component.html',
  styleUrls: ['./cartaoparcelado-list.component.css']
})
export class CartaoparceladoListComponent implements OnInit {
 
  parcelamento$: Observable<cartaoparcelado[]>;
  val : any={}


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    async ngOnInit()  {       

       this.parcelamento$ =this.fs.collection('parcelamentos', (ref) => ref.where('ativa','==',true).orderBy('datadacompra', 'desc')).get().pipe(map((result)=> this.convertSnaps<cartaoparcelado>(result)));
       this.fs.collection('update').valueChanges().subscribe(value => {
        this.val = value;
                   
})

    }


refresh(){

  this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value => {
    this.val = value;
    console.log(this.val)   

  //atualiza grid com parcelamentos em ser   
    var hoje = Timestamp.now()

      
    for (let x of this.val){
  if (x.ultimaparcela <= hoje){         
    this.ls.atualizarparcelazerada(x.id);
    }else {
     var mesparcelafinal = x.ultimaparcela.toDate() 
    var meshoje = hoje.toDate()
  const tes = mesparcelafinal.getMonth();
    const tes2 = meshoje.getMonth();  
    const qtdeparcfaltantes = tes-tes2
    const saldorestante = qtdeparcfaltantes * x.valorparcela
   this.ls.atualizarparcelaemser(x.id, qtdeparcfaltantes, saldorestante) ;
  
    }
            }   

 })



}

convertSnaps<T>(results){
  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }} 



