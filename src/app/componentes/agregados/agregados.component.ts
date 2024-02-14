import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup,ReactiveFormsModule , Validators } from '@angular/forms';


import { Component, OnInit } from '@angular/core';
import { Observable, async, map } from 'rxjs';
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
val: any = {};
sum: number;
valor: number;



  constructor( private as: AgregadoService, private fs: AngularFirestore) { }

  ngOnInit(){

    this.agregados$ =this.fs.collection('agregados', (ref) => ref.orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Agregado>(result)));
    console.log(this.agregados$)

    this.fs.collection('agregados').valueChanges().subscribe(value => {


      this.val = value;
      console.log(this.val);


      this.sum = this.val.reduce( function( a, b ) {
        return a + b.saldo_atual;
    }, 0 );


    console.log(this.sum)

    


      })


  }


  convertSnaps<T>(results){


    return <T[]> results.docs.map(snap=>{
      return{
        id:snap.id,
        ...<any> snap.data()



   }
    })
   }


      }




      //const res = await this.fs.collection('categories').add(categoryData);

     // console.log('Documento criado com ID: ', res.id);










