import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';

@Component({
  selector: 'page-formularioDiagnostico',
  templateUrl: 'formularioDiagnostico.html'
})
export class FormularioDiagnosticoPage {

  //Sobre usuarios
  listaUsuarios:any;
  nombreDoctor = '';
  nombrePaciente = '';
  id = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbFirebase:FirebaseDbProvider) {
    this.nombreDoctor = navParams.get('nombreDoctor');
    this.nombrePaciente = navParams.get('nombrePaciente');
    this.id = navParams.get('id');
  }


  ionViewDidEnterUsuarios()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  //Sobre diagnosticos
  listaDiagnosticos:any = 0;

  cambiaDiagnostico(paciente, doctor, fecha, sintoma, diagnostico, id)
  {

    let datosDiagnostico:Diagnostico=new Diagnostico();
    for(let diagnostico of this.listaDiagnosticos) {
      if(diagnostico.id == id){
        datosDiagnostico = diagnostico;
      }
    }
    //datosDiagnostico.paciente=paciente;
    datosDiagnostico.doctor=doctor;
    datosDiagnostico.fecha=fecha;
    datosDiagnostico.sintoma=sintoma;
    datosDiagnostico.diagnostico=diagnostico;
    //datosDiagnostico.id=id;

    this.dbFirebase.editaDiagnostico(datosDiagnostico).then(res=>{
      alert("Tu diagnóstico ha sido enviado correctamente");
    });

  }


  ionViewDidEnter()
  {
    this.dbFirebase.getDiagnosticos(this.nombrePaciente).subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  //Funcion para enviar formulario de diagnostico
  enviarFormulario():void{
    var diagnostico = document.forms["formularioPeticion"]["descripcionDiagnostico"].value;
    if (diagnostico == "") {
      alert("Debes escribir una descripción del diagnóstico");
      return;
    }
    if (diagnostico.length > 100) {
      alert("La descripción no puede tener más de 100 caracteres");
      return;
    }

    //Editamos diagnóstico
    var fecha;
    var sintoma;

    for(let diagnostico of this.listaDiagnosticos){
      if(diagnostico.id == this.id){
        fecha = diagnostico.fecha;
        sintoma = diagnostico.sintoma;
      }
    }

    this.cambiaDiagnostico(this.nombrePaciente, this.nombreDoctor, fecha, sintoma, diagnostico, this.id);
    this.navCtrl.pop();
    return;
  }

  obtenerSintomas():string
  {
    for(let diagnostico of this.listaDiagnosticos){
      if(diagnostico.id == this.id){
        var campoDevuelto = diagnostico.sintoma.toString();
        return campoDevuelto;
      }
    }
  }

  obtenerNombre():string
  {
    for(let diagnostico of this.listaDiagnosticos){
      if(diagnostico.id == this.id){
        var campoDevuelto = diagnostico.paciente.toString();
        return campoDevuelto;
      }
    }
  }


}
