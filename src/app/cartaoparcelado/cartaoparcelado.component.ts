import { cartaoparcelado } from './../modelos/cartaoparcelado';
import { Timestamp} from '@angular/fire/firestore';
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


      //inicia formulario
       this.parcForm();

      //parametros para selecionar o cartao
       this.cartao$ =this.fs.collection('contas', (ref) => ref.where('enquadramento','==',"rotativo").where('ativa','==', true)).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));

      //array com os documentos da colecao firestore incluindo os id
       this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value => {
        this.val = value;

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


let dataJS = new Date (ano, mes-1, dia);

const today = dataJS;
const monthsToAdd = a;
const newDate = this.addMonths(today, monthsToAdd);
var ultimaparcela = Timestamp.fromDate(newDate);

  var qt = this.cartaoparcForm.value.qtde_parcelas
  var vl = this.cartaoparcForm.value.valor_parcela
  var compra = qt*vl;


  const parcelamentogravar: cartaoparcelado = {
    datadacompra: this.cartaoparcForm.value.datadacompra,
    descricao: this.cartaoparcForm.value.descricao.toUpperCase(),
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
    cod:`${Date.now()}`,
    ultimaparcela: ultimaparcela,
    sv: false,
    parcelasrestantes: this.cartaoparcForm.value.qtde_parcelas,
    saldorestante: compra,
    log: Timestamp.now(),
    enq: 'cartao',
    sdo_dev_atual: null

  }

this.ls.gravarParcela(parcelamentogravar)
this.ResetForm()



}


ResetForm() {
  this.cartaoparcForm.reset();
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


convertSnaps<T>(results){
  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }}
