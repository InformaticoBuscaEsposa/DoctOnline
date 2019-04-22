import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';

@Component({
  selector: 'page-diagnostico',
  templateUrl: 'diagnostico.html'
})
export class DiagnosticoPage {

  //Sobre usuarios
  listaUsuarios:any;
  nombre = '';
  id ='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbFirebase:FirebaseDbProvider) {
    this.nombre = navParams.get('nombre');
    this.id = navParams.get('id');
  }


  ionViewDidEnterUsuarios()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  delUsuario(user)
  {
	  this.dbFirebase.delUsuario(user);
  }


  //Sobre diagnosticos
  listaDiagnosticos:any = 0;

  addDiagnostico(paciente, doctor, fecha, sintoma, diagnostico, id)
  {
    let datosDiagnostico:Diagnostico=new Diagnostico();

    datosDiagnostico.paciente=paciente;
    datosDiagnostico.doctor=doctor;
    datosDiagnostico.fecha=fecha;
    datosDiagnostico.sintoma=sintoma;
    datosDiagnostico.diagnostico=diagnostico;
    datosDiagnostico.id=id;

    this.dbFirebase.guardaDiagnostico(datosDiagnostico).then(res=>{
      alert(" Diagnostico de " + datosDiagnostico.paciente + " con id " + datosDiagnostico.id + " guardado en FB");
    });

  }

  ionViewDidEnter()
  {
    this.dbFirebase.getDiagnosticos(this.nombre).subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  obtenerCampo(campo):string
  {
    for(let diagnostico of this.listaDiagnosticos){
      if(diagnostico.id == this.id){
        var campoDevuelto;
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
