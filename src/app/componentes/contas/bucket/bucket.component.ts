import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {


  val: any = {};
  sum: number;
  valor: number;

  constructor(private fs: AngularFirestore){}

  ngOnInit(): void {

    this.fs.collection('contas', (ref)=> ref.where('mod_despesa', '==', 'off')).valueChanges().subscribe(value => {


      this.val = value;
      console.log(this.val);


      this.sum = this.val.reduce( function( a, b ) {
        return a + b.saldo;
    }, 0 );


    console.log(this.sum)


      })

  }


}
