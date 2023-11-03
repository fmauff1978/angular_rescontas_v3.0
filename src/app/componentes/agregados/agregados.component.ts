import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Agregado } from 'src/app/modelos/agregado';
import { AgregadoService } from 'src/app/servicos/agregado.service';
import { FormBuilder } from '@angular/forms';


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
form = this.fb.group({
  cod: [''],
  nome: [' '],
  descricao: [''],
  saldo: [" "]

});

  constructor( private as: AgregadoService, private fs: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit(): void {


  }
  async onSubmit(data: Agregado){



    let categoryData =

      {id: String,
        cod: data.cod,
       nome: data.nome,
       descricao: data.descricao,
       saldo: data.saldo_atual,
      log: new Date()}

      console.log(data);

      if (this.formStatus == "Adicionar"){
        this.as.saveData(categoryData);




      }




      //const res = await this.fs.collection('categories').add(categoryData);

     // console.log('Documento criado com ID: ', res.id);






    }

}
