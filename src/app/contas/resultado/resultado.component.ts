import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  resultados$: Observable<Conta[]>;


  constructor(private fs: AngularFirestore){}

    ngOnInit(){
      this.resultados$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"resultado").where('ativa','==', true).orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));

     
      console.log(this.resultados$)



 }


 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()



 }
  })
 }}
{

}{

}

