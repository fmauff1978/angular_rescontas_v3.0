import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Agregado } from '../modelos/agregado';

@Injectable({
  providedIn: 'root'
})
export class AgregadoService implements OnInit {


  agregados$!: Observable<Agregado>;


  constructor(private fs: AngularFirestore, ) { }



async saveData(agregado: Agregado){

  const res =await this.fs.collection('agregados').add(agregado);
  console.log('Documento criado com ID: ', res.id);

}
updateData(id: string | undefined, EditData: Partial<unknown>){



  this.fs.collection('contas').doc(id).update(EditData).then(docRef =>{


    console.log(id, EditData)
  })


}



  ngOnInit(): void {


  }






}
