import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { cartaoparcelado } from '../modelos/cartaoparcelado';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';
import { Timestamp } from '@angular/fire/firestore';
import { MomentInput } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-cartaoparcelado-list',
  templateUrl: './cartaoparcelado-list.component.html',
  styleUrls: ['./cartaoparcelado-list.component.css']
})
export class CartaoparceladoListComponent implements OnInit {

  parcelamento$: Observable<cartaoparcelado[]>;
  val : any={}
  val2 : any={}
  val3 : any={}
  val4 : any={}
  zero: any={}
  sv: boolean;
  qtdeparcelasfaltantes: number;
  saldorestante: number;
  one: MomentInput;
  hoje: MomentInput;
  id: string;
  now: MomentInput;
  atualizacao$: any;
  fonte: Array<any>;
  sum: number;
  parctotalmes: number;


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    async ngOnInit()  {


      //listagem dos parcelamentos em ser
  this.parcelamento$ = this.fs.collection('parcelamentos', (ref) => ref.where('ativa','==', true).where('ativa','==',true).orderBy('valorparcela', 'desc')).get().pipe(map((result)=> this.convertSnaps<cartaoparcelado>(result)));

    this.atualizacao$ =this.fs.collection('update').get().pipe(map((result)=> this.convertSnaps<cartaoparcelado>(result)));

      //conferir se o update do banco está sincronizado com o da tela renderizada
        this.fs.collection('update').doc('cjMX9mVVDtulRmNpbMzZ').valueChanges().subscribe(value => {
        this.val3 = value;
        var dia_hoje = Timestamp.now().toDate().toLocaleDateString('pt-BR');
        var dia_pos = this.val3.posicao.toDate().toLocaleDateString('pt-BR');
        console.log(dia_hoje)
        console.log(dia_pos)

       if (dia_hoje == dia_pos){
        console.log("Parcelamentos atualizados!")
      } else {
       // this.refresh()
        }
    })


    //total dos parcelamentos
    this.fs.collection('parcelamentos', (ref)=> ref.where('enq', '==', 'cartao').where('ativa', '==', true)).valueChanges().subscribe(value => {
      this.val = value;

      this.sum = this.val.reduce( function( a, b ) {
        return a + b.saldorestante;
    }, 0 );



     })


     //total parcela por mes
     this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true).where('ativa', '==', true)).valueChanges().subscribe(x => {
      this.val = x;

      this.parctotalmes = this.val.reduce( function( a, b ) {
        return a + b.valorparcela;
    }, 0 );

     })
        }



  refresh(){


    //exclui do grid parcelamentos liquidados
    this.fs.collection('parcelamentos', (ref)=> ref.where('ativa','==',true).where('parcelasrestantes', '<', 1)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.zero = value;
      console.log(this.zero)

        if (this.zero.length ==0){
          console.log("nao há parcelamentos liquidados")
        }else {
          let names = this.zero.map(x => x.id);
          console.log(names)
          for(let i=0;i<this.zero.length;i++){
           let id = names[i];
           let debito15 = this.fs.collection('parcelamentos').doc(id);
           debito15.update({ativa: false});
           console.log("parcelamento", `${id}`,"já liquidado")}}})

    //atualiza grid com parcelamentos em ser
    this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.fonte = value;
      console.log(this.fonte)


    for(let i=0;i<this.fonte.length;i++){

      let id : string =this.fonte[i].id;
    let hoje = Timestamp.now().toDate();
     let one = this.fonte[i].ultimaparcela.toDate();
     let valor = this.fonte[i].valorparcela;
     console.log(id, one, valor)
     const now = moment(hoje); // Data de hoje
     const future = moment(one); // Outra data no passado
     const duration = moment.duration(future.diff(now));
     const months = duration.asMonths();
     this.qtdeparcelasfaltantes = Math.trunc(months) + 1
    this.saldorestante = this.qtdeparcelasfaltantes * valor
////console.log(hoje)
//console.log(this.one)
//console.log(id)
console.log(this.qtdeparcelasfaltantes, this.saldorestante)


this.ls.atualizarparcelaemser(id,this.qtdeparcelasfaltantes, this.saldorestante)}


  })

  console.log("terminado")

  }


convertSnaps<T>(results){
  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }}



