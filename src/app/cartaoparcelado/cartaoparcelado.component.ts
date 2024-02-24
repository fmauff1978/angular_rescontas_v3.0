import { cartaoparcelado } from './../modelos/cartaoparcelado';
import { Timestamp } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Conta } from '../modelos/conta';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-cartaoparcelado',
  templateUrl: './cartaoparcelado.component.html',
  styleUrls: ['./cartaoparcelado.component.css']
})
export class CartaoparceladoComponent implements OnInit {

  cartao$: Observable<Conta[]>;
  cartaoparcForm!: FormGroup;
  parcelamento$: Observable<cartaoparcelado[]>
  data_atual: Date;
  val: any = {}


  constructor(private fs: AngularFirestore, private ls: LancamentoService, private fb: FormBuilder){}

    async ngOnInit() {

       this.parcForm();

       this.cartao$ =this.fs.collection('contas', (ref) => ref.where('enquadramento','==',"rotativo").where('ativa','==', true)).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));  

       this.parcelamento$ =this.fs.collection('parcelamentos', (ref) => ref.where('ativa','==',true)).get().pipe(map((result)=> this.convertSnaps<cartaoparcelado>(result)));

       this.data_atual = new Date();
       console.log(this.data_atual)

       this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges().subscribe(value => {
        this.val = value;
        console.log(this.val)

        for (const key in this.val)
{
   // Get the strongly typed value with this name:
   const vat = this.val[key];
   console.log(vat)
  
   // Now we have the the strongly typed value for this key (depending on how bigObject was typed in the first place).
   
   // Do something interesting with the property of bigObject...
}
     
      
       
        for (let x in this.val){
          
         
        }
      
      
      
      }) 


           
      
       }
             



parcForm() {
  this.cartaoparcForm = this.fb.group({
    datadacompra: [' '],
    descricao: [' '],
    cartaovinculado: [' '],
    origem: [' '],
    qtde_parcelas: [' '],
    data_parcela: [' '],
    valor_parcela: [' '],
    
    ativa: true,
    log: [Timestamp.now()],
  });
}


onSubmit() {

  let cardvinculado = this.cartaoparcForm.value.cartaovinculado.split('-');
  let primeiraparcela = this.cartaoparcForm.value.data_parcela.split('-');
  let a = (this.cartaoparcForm.value.qtde_parcelas)-1;
  let dia = primeiraparcela[2];
 let mes = primeiraparcela[1];
 let ano = primeiraparcela[0];

  //console.log(primeiraparcela);
 // console.log(cardvinculado);
 // console.log(dia)
 // console.log(mes)
 // console.log(ano)
  //console.log(a)

  let dataJS = new Date (ano, mes-1, dia);
  console.log(dataJS)


 
const today = dataJS;
const monthsToAdd = a;
const newDate = this.addMonths(today, monthsToAdd);
console.log("Data atual:", today);
console.log("Data após adicionar", monthsToAdd, "meses:", newDate);


var ultimaparcela = Timestamp.now();




  //console.log(primeiraparcela);
 // console.log(cardvinculado);
  //console.log(dia)
 // console.log(mes)
 // console.log(ano)


  const codcartao = cardvinculado[1];
  const nome = cardvinculado[2];
  const enq = cardvinculado[3];
  var qt = this.cartaoparcForm.value.qtde_parcelas
  var vl = this.cartaoparcForm.value.valor_parcela
  var compra = qt*vl;
  console.log(compra)

  const parcelamentogravar: cartaoparcelado = {
    datadacompra: this.cartaoparcForm.value.datadacompra,
    descricao: this.cartaoparcForm.value.descricao,
    cartaovinculado: {
      cod: cardvinculado[1],
      nome: cardvinculado[2],
      enquadramento: cardvinculado[3],
    },
    origem: this.cartaoparcForm.value.origem,
    qtdedeparcelas: this.cartaoparcForm.value.qtde_parcelas,
    dataparcela: this.cartaoparcForm.value.data_parcela,
    valorparcela: this.cartaoparcForm.value.valor_parcela,
    valorcompra: compra,
    juros: 0,
    ativa: true,
    cod: Date.now(),
    ultimaparcela: ultimaparcela,
    parcelasrestantes: null,
    saldorestante: null,
    log: Timestamp.now(),
    id: ''
  }

this.ls.gravarParcela(parcelamentogravar)
this.ResetForm()

}


ResetForm() {
  this.cartaoparcForm.reset();
}

dateFromString(str) {
  return new Date(str);
}

addMonths(date, months) {
  const newDate = new Date(date.valueOf());
  const currentMonth = newDate.getMonth();
  const newMonth = currentMonth + months;
  newDate.setMonth(newMonth);
  // Verifique se o dia do mês mudou após adicionar os meses
  if (newDate.getDate() !== date.getDate()) {
    // Ajuste a data para o último dia do mês anterior
    newDate.setDate(0);
  }
  return newDate;
}

subMonths(date, months) {
  const newDate = new Date(date.valueOf());
  const currentMonth = newDate.getMonth();
  const newMonth = currentMonth - months;
  newDate.setMonth(newMonth);
  // Verifique se o dia do mês mudou após adicionar os meses
  if (newDate.getDate() !== date.getDate()) {
    // Ajuste a data para o último dia do mês anterior
    newDate.setDate(0);
  }
  return newDate;
}


convertSnaps<T>(results){
  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }}
