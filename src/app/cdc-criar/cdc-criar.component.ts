import { Conta } from 'src/app/modelos/conta';
import { Component, OnInit } from '@angular/core';
import { cartaoparcelado } from '../modelos/cartaoparcelado';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LancamentoService } from '../servicos/lancamento.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { cdc } from '../modelos/cdc';

@Component({
  selector: 'app-cdc-criar',
  templateUrl: './cdc-criar.component.html',
  styleUrls: ['./cdc-criar.component.css']
})
export class CdcCriarComponent implements OnInit{

  parcelamento$: Observable<cartaoparcelado[]>
  cdc_Form!: FormGroup;
  cdc$: Observable<Conta[]>
  val: Array<any>

  constructor(private fs: AngularFirestore, private ls: LancamentoService, private fb: FormBuilder){}


  ngOnInit() {

     //inicia formulario
     this.cdcForm();

     //parametros para selecionar o cartao

      this.cdc$ = this.fs.collection('contas', (ref) => ref.where('natureza','==',"passivo").where('ativa','==', true).orderBy('conta', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));
      console.log(this.cdc$)




  }

 cdcForm() {
    this.cdc_Form = this.fb.group({
      datadatransacao: [' '],
      descricao: [' '],
      contavinculada: [' '],
      valor_cdc: [' '],
      qtde_parcelas: [' '],
      dataprimeiraparcela: [' '],
      valor_parcela: [' '],
      juros: [''],
      iof:[''],
      tarifas_seguros: [''],
      ativa: true,
      log: [Timestamp.now()],
    });
  }

  onSubmit(){

  let cardvinculado = this.cdc_Form.value.contavinculada.split('-');
  let primeiraparcela = this.cdc_Form.value.dataprimeiraparcela.split('-');
  let a = (this.cdc_Form.value.qtde_parcelas)-1;
  let dia = primeiraparcela[2];
 let mes = primeiraparcela[1];
 let ano = primeiraparcela[0];





let dataJS = new Date (ano, mes-1, dia);

const today = dataJS;
const monthsToAdd = a;
const newDate = this.addMonths(today, monthsToAdd);
var ultimaparcela = Timestamp.fromDate(newDate);

  var qt = this.cdc_Form.value.qtde_parcelas
  var vl = this.cdc_Form.value.valor_parcela
  var compra = qt*vl;


  const cdcgravar: cdc = {
    datadatransacao: this.cdc_Form.value.datadatransacao,
    descricao: this.cdc_Form.value.descricao.toUpperCase(),
    contavinculada: {
      cod: cardvinculado[1],
      nome: cardvinculado[2],
      enquadramento: cardvinculado[4],
    },
    origem: null,
    qtdedeparcelas: this.cdc_Form.value.qtde_parcelas,
    dataprimeiraparcela: this.cdc_Form.value.dataprimeiraparcela,
    valorparcela: this.cdc_Form.value.valor_parcela,
    valorfinanciamento: this.cdc_Form.value.valor_cdc,
    juros: this.cdc_Form.value.juros,
    ativa: true,
    iof: this.cdc_Form.value.iof,
    tarifas_seguros: this.cdc_Form.value.tarifas_seguros,
    cod:`${Date.now()}`,
    ultimaparcela: ultimaparcela,
    sv: false,
    parcelasrestantes: this.cdc_Form.value.qtde_parcelas,
    sdo_dev_atual:  this.cdc_Form.value.valor_cdc,
    log: Timestamp.now(),
    enq: 'cdc'


  }

this.ls.gravarCDC(cdcgravar)
this.ResetForm()

}

  convertSnaps<T>(results){
    return <T[]> results.docs.map(snap=>{
      return{
        id:snap.id,
        ...<any> snap.data()
   }
    })
   }

   ResetForm() {
    this.cdc_Form.reset();
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





}
