import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Diagnostico} from '../../models/diagnostico.model';

@Component({
  selector: 'page-diagnostico',
  templateUrl: 'diagnostico.html'
})
export class DiagnosticoPage {
  nombre = '';
  id ='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbFirebase:FirebaseDbProvider) {
    this.nombre = navParams.get('nombre');
    this.id = navParams.get('id');
  }

  //Sobre diagnosticos
  listaDiagnosticos:any = 0;

  ionViewDidEnter()
  {
    this.dbFirebase.getDiagnosticos(this.nombre).subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  obtenerCampo(campo):string
  {
    for(let diagnostico of this.listaDiagnosticos){
      if(diagnostico.id == this.id){
        var campoDevuelto;
        if (campo=="paciente"){
          campoDevuelto = diagnostico.paciente.toString();
        }
        if (campo=="doctor"){
          campoDevuelto = diagnostico.doctor.toString();
        }
        if (campo=="fecha"){
          campoDevuelto = diagnostico.fecha.toString();
        }
        if (campo=="sintoma"){
          campoDevuelto = diagnostico.sintoma.toString();
        }
        if (campo=="diagnostico"){
          campoDevuelto = diagnostico.diagnostico.toString();
        }
        return campoDevuelto;
      }
    }
  }

}
