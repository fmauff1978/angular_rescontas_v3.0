import { LancamentoService } from './../servicos/lancamento.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContaService } from '../servicos/conta.service';
import {Timestamp, serverTimestamp} from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from '../modelos/conta';


@Component({
  selector: 'app-criar-lancamento',
  templateUrl: './criar-lancamento.component.html',
  styleUrls: ['./criar-lancamento.component.css']
})
export class CriarLancamentoComponent implements OnInit{

  lctosForm!: FormGroup;
  formStatus: string = "Adicionar";
  id:string;
  contas$ : Observable<Conta[]>


constructor(private ls: LancamentoService, private fs: AngularFirestore, private fb: FormBuilder){}


  ngOnInit() {

    this.lancamentoForm();
    this.contas$ =this.fs.collection('contas', (ref) => ref.orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));



    console.log(this.contas$)

  }
  convertSnaps<T>(results){


    return <T[]> results.docs.map(snap=>{
      return{
        id:snap.id,
        ...<any> snap.data()



   }
    })
   }



lancamentoForm(){

    this.lctosForm = this.fb.group({
      
      datadolancamento: [' '],
      descricao: [" "],
    conta_debitada: [' '],
      conta_creditada: [' '],
    valor: [" "],
      log : [new Date()]




   })}



    ResetForm(){

      this.lctosForm.reset();

    }

    onSubmit(){




      this.ls.saveData(this.lctosForm.value);



      console.log(this.lctosForm.value.log);






     this.ResetForm();





      console.log("Dcoumentos" + this.lctosForm + "incluidos com sucesso");










        }






}
