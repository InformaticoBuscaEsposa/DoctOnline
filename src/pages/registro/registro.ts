import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

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

  ionViewDidEnter()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  delUsuario(dni)
  {
	  this.dbFirebase.delUsuario(dni);
  }

}
