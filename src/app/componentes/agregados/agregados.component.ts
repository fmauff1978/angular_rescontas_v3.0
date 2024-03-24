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

agregadoId: string | undefined;
val: any = {};
sum: number;
valor: number;
  desptotal: any ={};
  rectotal: any = {};
  super: number;



  constructor( private as: AgregadoService, private fs: AngularFirestore) { }

  ngOnInit(){

    this.agregados$ =this.fs.collection('agregados', (ref) => ref.orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Agregado>(result)));




    this.fs.collection('agregados').valueChanges().subscribe(value => {
      this.val = value;
      console.log(this.val);

      this.sum = this.val.reduce( function( a, b ) {
        return a + b.saldo_atual;
    }, 0 );
    console.log(this.sum)
      })

      this.fs.collection('agregados', (ref) => ref.where('cod','in', [301,401])).valueChanges().subscribe(x=>{
        this.desptotal = x;

        var subtraendo = this.desptotal[0].saldo_atual;
        var minuendo = this.desptotal[1].saldo_atual;
        let superavit = (minuendo+subtraendo)*(-1)
        this.super = superavit;
        console.log(this.super)
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




      









