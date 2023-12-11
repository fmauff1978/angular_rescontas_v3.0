import { LancamentoService } from './../servicos/lancamento.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContaService } from '../servicos/conta.service';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { Conta, MyDate } from '../modelos/conta';
import { ToastrService } from 'ngx-toastr';
import { Lancamento } from '../modelos/lancamento';
import { Query, Timestamp, collection, getAggregateFromServer, query, queryEqual, sum, where } from '@angular/fire/firestore';


@Component({
  selector: 'app-criar-lancamento',
  templateUrl: './criar-lancamento.component.html',
  styleUrls: ['./criar-lancamento.component.css'],
})
export class CriarLancamentoComponent implements OnInit {
  lctosForm!: FormGroup;
  formStatus: string = 'Adicionar';
  id: string;
  contas$: Observable<Conta[]>;

  constructor(
    private ls: LancamentoService,
    private fs: AngularFirestore,
    private fb: FormBuilder,
    private ts: ToastrService
  ) {}

  ngOnInit() {
    this.lancamentoForm();
    this.contas$ = this.fs
      .collection('contas', (ref) => ref.orderBy('cod', 'asc'))
      .get()
      .pipe(map((result) => this.convertSnaps<Conta>(result)));

    console.log(this.contas$);


  }
  convertSnaps<T>(results) {
    return <T[]>results.docs.map((snap) => {
      return {
        id: snap.id,
        ...(<any>snap.data()),
      };
    });
  }

  lancamentoForm() {
    this.lctosForm = this.fb.group({
      datadolancamento: [' '],
      descricao: [' '],
      conta_debitada: [' '],
      conta_creditada: [' '],
      valor: [' '],
      log: [new Date()],
    });
  }

  ResetForm() {
    this.lctosForm.reset();
  }

  onSubmit() {
    console.log(this.lctosForm.value.log);
    let splitted_deb = this.lctosForm.value.conta_debitada.split('-');
    let splitted_cred = this.lctosForm.value.conta_creditada.split('-');
    console.log(splitted_deb);
    console.log(splitted_cred)
    const lctogravar: Lancamento = {

      datadolancamento: this.lctosForm.value.datadolancamento,
      descricao: this.lctosForm.value.descricao,
      conta_debitada: {contadeb_id: splitted_deb[0],
                      cod_deb: splitted_deb[1],
                      contadeb: splitted_deb[2],
                      naturezadeb: splitted_deb[3],
                      enquadramentodeb: splitted_deb[4],
                      mod_despesa_deb: splitted_deb[5]},
      conta_creditada: {contacred_id: splitted_cred[0],
                        cod_cred: splitted_cred[1],
                        contacred: splitted_cred[2],
                        naturezacred: splitted_cred[3],
                        enquadramentocred: splitted_cred[4],
                        mod_despesa_cred: splitted_cred[5]},
      valor: this.lctosForm.value.valor,
      log: Timestamp.now()





    }

    this.ls.saveData(lctogravar);

    
    this.ResetForm();


  }












  async consultarSaldo(){



}

}
