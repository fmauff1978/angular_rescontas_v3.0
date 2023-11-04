import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css'],

})
export class ContasComponent implements OnInit {

  contas$: Observable<Conta[]>;


  constructor(private fs: AngularFirestore){}

    ngOnInit(){
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
 }}


