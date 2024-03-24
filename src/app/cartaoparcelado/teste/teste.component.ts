import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import * as moment from 'moment';
import { MomentInput } from 'moment';
import { CartaoparceladoListComponent } from 'src/app/cartaoparcelado-list/cartaoparcelado-list.component';
import { LancamentoService } from 'src/app/servicos/lancamento.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  val : any = {};
  val3 : any = {};
  val20 : any = {};
  zero : any = {};
  qtdeparcelasfaltantes: number;
  saldorestante: number;
  one: MomentInput;
  hoje: MomentInput;
  id: string;
  now: MomentInput;
  valor: number;
  fonte: any ={};
  descmaius: string;


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

  ngOnInit() {



    console.log("iniciando")



 //   this.refresh()

    this.fs.collection('parcelamentos', (ref)=> ref.where('sv', '==', false)).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.fonte = value;
    console.log(this.fonte)})

//this.refresh3()



//this.maiusculas()

    }




      desmarcarParc(){

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
              console.log("parcelamento", `${id}`,"já liquidado")}}



            this.fs.collection('parcelamentos', (ref)=> ref.where('ativa','==',true).where('sv', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
              this.val = value;
              let ids = this.val.map(x => x.id);


              for(let i=0;i<ids.length;i++){
              let id = ids[i];
              let debito15 = this.fs.collection('parcelamentos').doc(id);
              debito15.update({sv: false});
              console.log("sv", `${id}`," marcado com sucesso")}})

              console.log("terminei")})







//this.fs.collection('parcelamentos', (ref)=> ref.where('sv', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
//this.val = value;
////console.log(this.val)
//var tamanho = this.val.length
//console.log(tamanho)
//let names = this.val.map(x => x.id);
//console.log (names)



//for(let i=0;i<names.length;i++){
 // let id = names[i];
 //// let debito15 = this.fs.collection('parcelamentos').doc(id);
 //debito15.update({sv: false});
 //console.log("sv", `${id}`," marcado com sucesso")
//})


//for (let i =0; i<this.val.lenght;i++){




//}

//for (let x of this.val){

 // let id = x.id
  //let debito15 = this.fs.collection('parcelamentos').doc(id);
 //// debito15.update({sv: false});
 // console.log("sv", `${x.id}`," marcado com sucesso")
 // continue
////}
//console.log('processo de desmarcacao finalizado')
}





 refresh(){

  //atualiza grid com parcelamentos em ser

 this.fs.collection('parcelamentos', (ref)=> ref.where('sv', '==', false)).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.fonte = value})


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
//console.log(hoje)
console.log(one)
console.log(id)
console.log(this.qtdeparcelasfaltantes, this.saldorestante)

let debito15 =  this.fs.collection('parcelamentos').doc(id);
 debito15.update({parcelasrestantes: (this.qtdeparcelasfaltantes)})
 debito15.update({saldorestante: (this.saldorestante)})
  debito15.update({sv: true})
 debito15.update({log: Timestamp.now()})

//this.ls.atualizarparcelaemser(id,this.qtdeparcelasfaltantes, this.saldorestante)

  }


  let debito10 = this.fs.collection('update').doc('cjMX9mVVDtulRmNpbMzZ');
  debito10.update({posicao: Timestamp.now()})
  console.log("atualizado o log central!")




  console.log("terminado")

}




/*let debito15 = this.fs.collection('parcelamentos').doc(id);
debito15.update({parcelasrestantes: (this.qtdeparcelasfaltantes)}).then(()=>{
  console.log("parcelas restantes atualizadas")})
debito15.update({saldorestante: (this.valor)}).then(()=>{
  console.log("saldo restante atualizadas")})
debito15.update({sv: true}).then(()=>{
  console.log("sv atualizadas")})
debito15.update({log: Timestamp.now()}).then(()=>{
  console.log("update atualizadas")})

let debito10 = this.fs.collection('update').doc('cjMX9mVVDtulRmNpbMzZ');
debito10.update({posicao: Timestamp.now()}).then(()=>{
  console.log("tabelas atualizadsas")})*/







   refresh3(){


    //exclui do grid parcelamentos liquidados
       //atualiza grid com parcelamentos em ser
    this.fs.collection('parcelamentos', (ref)=> ref.where('sv', '==', false)).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.fonte = value;
    console.log(this.fonte)

    this.fonte.forEach(x=>{

      let id = x.id;
      let hoje = Timestamp.now().toDate();
      let one = x.ultimaparcela.toDate();
      let valor = x.valorparcela;

      console.log(id, one, valor)
      const now = moment(hoje); // Data de hoje
      const future = moment(one); // Outra data no passado
      const duration = moment.duration(future.diff(now));
      const months = duration.asMonths();
      this.qtdeparcelasfaltantes = Math.trunc(months) + 1
     this.saldorestante = this.qtdeparcelasfaltantes * valor
   //console.log(hoje)
   console.log(one)
   console.log(id)
   console.log(this.qtdeparcelasfaltantes, this.saldorestante)



   let debito15 =  this.fs.collection('parcelamentos').doc(id);
 debito15.update({parcelasrestantes: (this.qtdeparcelasfaltantes)})
 debito15.update({saldorestante: (this.saldorestante)})
  debito15.update({sv: true})
 debito15.update({log: Timestamp.now()})

   //this.ls.atualizarparcelaemser(id,this.qtdeparcelasfaltantes, this.saldorestante)





    })
    console.log("terminado")



  })}


  maiusculas(){

    this.fs.collection('parcelamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
      this.fonte = value;

    for(let i=0;i<this.fonte.length;i++){

        let id7: string =this.fonte[i].id;
        console.log(id7)

       let log = this.fonte[i].log.toDate()

       console.log(log)



     // let hoje = Timestamp.now().toDate();
    //  let one = this.fonte[i].ultimaparcela.toDate();
     // let valor = this.fonte[i].valorparcela;
     // const now = moment(hoje); // Data de hoje
     // const future = moment(one); // Outra data no passado
    //  const duration = moment.duration(future.diff(now));
    //  const months = duration.asMonths();
   // //  this.qtdeparcelasfaltantes = Math.trunc(months) + 1
    //  this.saldorestante = this.qtdeparcelasfaltantes * valor

       // let debito15 = this.fs.collection('parcelamentos').doc(id7);
      // debito15.update({enq: "cartao"})
       // debito15.update({log: Timestamp.now()})
      //  debito15.update ({saldorestante: (this.saldorestante)})



    }


  })}






}

