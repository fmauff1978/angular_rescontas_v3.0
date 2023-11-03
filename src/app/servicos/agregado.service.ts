import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AgregadoService implements OnInit {



  constructor(private fs: AngularFirestore) { }


async saveData(modelo: any){

  const res =await this.fs.collection('contas').add(modelo);
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
