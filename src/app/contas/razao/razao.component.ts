import { Lancamento } from 'src/app/modelos/lancamento';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';



@Component({
  selector: 'app-razao',
  templateUrl: './razao.component.html',
  styleUrls: ['./razao.component.css']
})
export class RazaoComponent implements OnInit {

  razao$: Observable<Lancamento[]>;

  contarazao: string = "BB";


  constructor(private fs: AngularFirestore){}

    ngOnInit(){

      this.razao$ = this.fs.collection('lancamentos', (ref) => ref.where('conta_debitada','==',this.contarazao).orderBy('datadolancamento', 'asc')).get().pipe(map((result)=> this.convertSnaps<Lancamento>(result)));

     
      console.log(this.razao$)



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

}

