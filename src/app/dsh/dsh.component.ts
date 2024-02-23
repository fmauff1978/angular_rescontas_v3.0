import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';
import { Observable, map } from 'rxjs';
import { kpi } from '../modelos/kpi';

@Component({
  selector: 'app-dsh',
  templateUrl: './dsh.component.html',
  styleUrls: ['./dsh.component.css']
})
export class DshComponent implements OnInit{


  kpi$: Observable<kpi[]>;

  val: any = {};

  atg: number;

  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

  ngOnInit() {


    this.kpi$ =this.fs.collection('kpi').get().pipe(map((result)=> this.convertSnaps<kpi>(result)));
    console.log(this.kpi$)


    this.fs.collection('kpi').valueChanges().subscribe(value => {


      this.val = value;
      console.log(this.val);
      var orc = this.val.map(function(e) { return e.orcado; } );
      var real = this.val.map(function(e) { return e.realizado; } );
      let atg = real/orc;
      console.log (atg)
      this.atg = atg;

   
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
