import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup,ReactiveFormsModule , Validators } from '@angular/forms';


import { Component, OnInit } from '@angular/core';
import { Observable, async } from 'rxjs';
import { Agregado } from 'src/app/modelos/agregado';
import { AgregadoService } from 'src/app/servicos/agregado.service';



@Component({
  selector: 'app-agregados',
  templateUrl: './agregados.component.html',
  styleUrls: ['./agregados.component.css'],

})
export class AgregadosComponent implements OnInit {

agregados$: Observable<Agregado[]> | undefined;
formCategory: string | undefined;
formStatus: string = "Adicionar";
agregadoId: string | undefined;

  agregadosForm!: FormGroup;



  constructor( private as: AgregadoService, private fs: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit(){

this.agregForm();
  }


agregForm(){

  this.agregadosForm = this.fb.group({
    cod: [' '],
    nome: [' '],
  descricao: [" "],
 saldo_atual: [' '],
 log: new Date()

  })}

  ResetForm(){

    this.agregadosForm.reset();
  }



  onSubmit(){


    this.as.saveData(this.agregadosForm.value);

    console.log("Dcoumentos" + this.agregadosForm + "incluidos com sucesso");

    this.ResetForm();







      }




      //const res = await this.fs.collection('categories').add(categoryData);

     // console.log('Documento criado com ID: ', res.id);






    }



