import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';

@Component({
  selector: 'page-formularioSintomas',
  templateUrl: 'formularioSintomas.html'
})
export class FormularioSintomasPage {

  //Sobre usuarios
  listaUsuarios:any;

  constructor(public navCtrl: NavController,public dbFirebase:FirebaseDbProvider) {

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
      alert(" Diagnostico de " + datosDiagnostico.paciente + " con id " + datosDiagnostico.id + " guardado en FB");
    });

  }

  ionViewDidEnterDiagnosticos()
  {
    this.dbFirebase.getDiagnosticos().subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  //Funcion para enviar formulario de sintomas
  enviarFormulario():void{
    var x = document.forms["formularioPeticion"]["descripcionSintomas"].value;
    if (x == "") {
      alert("Debes escribir una descripción a tus síntomas");
      return;
    }
    var f = new Date();
    var fechaActual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    this.addDiagnostico("paciente", "Aún sin asignar", fechaActual, x, "Aún sin diagnosticar", "X");
    return;
  }


}
