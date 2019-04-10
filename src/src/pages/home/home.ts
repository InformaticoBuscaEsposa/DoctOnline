import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Sobre usuarios
  listaUsuarios:any;

  constructor(public navCtrl: NavController,public dbFirebase:FirebaseDbProvider) {

  }


  updateUsuario(SS)
  {
	  let datosUsuario:Usuario=new Usuario();
	  datosUsuario.SegSocial=SS;
	  datosUsuario.nombre="Maria";
	  datosUsuario.apellidos="de las mercedes";

	  this.dbFirebase.guardaUsuario(datosUsuario);
  }

  ionViewDidEnterUsuarios()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  delUsuario(SS)
  {
	  this.dbFirebase.delUsuario(SS);
  }


  //Sobre diagnosticos
  listaDiagnosticos:any;

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
      alert(datosDiagnostico.paciente + " con id " + datosDiagnostico.id + " guardado en FB");
    });

  }

  ionViewDidEnterDiagnosticos()
  {
    this.dbFirebase.getDiagnosticos().subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

}
