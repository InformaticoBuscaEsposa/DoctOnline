import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
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
  nombre = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbFirebase:FirebaseDbProvider) {
    this.nombre = navParams.get('nombre');
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

  ionViewDidEnter()
  {
    this.dbFirebase.getDiagnosticos(this.nombre).subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  //Funcion para enviar formulario de sintomas
  enviarFormulario():void{
    var sintomas = document.forms["formularioPeticion"]["descripcionSintomas"].value;
    if (sintomas == "") {
      alert("Debes escribir una descripción a tus síntomas");
      return;
    }
    //Calculamos fecha
    var f = new Date();
    var fechaActual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    //Calculamos id (será el número de diagnóstico cronológicamente)

    var id = this.listaDiagnosticos.length;
    //Añadimos diagnóstico
    this.addDiagnostico(this.nombre, "Aún sin asignar", fechaActual, sintomas, "Aún sin diagnosticar", id);
    this.navCtrl.pop();
    return;
  }


}
