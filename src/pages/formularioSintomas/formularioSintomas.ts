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

  addUsuario(nombre, apellidos, tipo, dni, correo, clave, nSeguridadSocial, titulo)
  {
		let datosUsuario:Usuario=new Usuario();

		datosUsuario.nombre=nombre;
		datosUsuario.apellidos=apellidos;
    datosUsuario.tipo=tipo;
    datosUsuario.dni=dni;
    datosUsuario.correo=correo;
    datosUsuario.clave=clave;
    datosUsuario.nSeguridadSocial=nSeguridadSocial;
    datosUsuario.titulo=titulo;

		this.dbFirebase.guardaUsuario(datosUsuario).then(res=>{
			alert(datosUsuario.dni+ " guardado en FB");
		});

  }

  updateUsuario(dni)
  {
	  let datosUsuario:Usuario=new Usuario();
	  datosUsuario.dni=dni;
	  datosUsuario.nombre="Maria";
	  datosUsuario.apellidos="de las mercedes";

	  this.dbFirebase.guardaUsuario(datosUsuario);
  }

  ionViewDidEnterUsuarios()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  delUsuario(dni)
  {
	  this.dbFirebase.delUsuario(dni);
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
