import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';

@Component({
  selector: 'app-passivo',
  templateUrl: './passivo.component.html',
  styleUrls: ['./passivo.component.css']
})
export class PassivoComponent implements OnInit {

  passivos$: Observable<Conta[]>;


  constructor(private fs: AngularFirestore){}

    ngOnInit(){
      this.passivos$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"passivo").where('ativa','==', true).orderBy('enquadramento', 'desc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));


      console.log(this.passivos$)



 }


 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()



 }
  })
 }}



