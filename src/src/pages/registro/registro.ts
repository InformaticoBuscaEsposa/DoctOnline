import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {EntradaPage} from '../entrada/entrada';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  listaUsuarios:any;

  constructor(public navCtrl: NavController,public dbFirebase:FirebaseDbProvider) {

  }

  addUsuario(user,nombre, apellidos, tipo, email, nacionalidad, CP, direccion, SS,)
  {
		let datosUsuario:Usuario=new Usuario();

    datosUsuario.user =user;
		datosUsuario.nombre=nombre;
		datosUsuario.apellidos=apellidos;
    datosUsuario.email=email;
    datosUsuario.nacionalidad=nacionalidad;
    datosUsuario.CodPostal=CP;
    datosUsuario.direccion=direccion;
    datosUsuario.SegSocial=SS;

		this.dbFirebase.guardaUsuario(datosUsuario).then(res=>{
			alert(datosUsuario.SegSocial+ " guardado en FB");
		});

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

  irPaginaEntrada():void {
    this.navCtrl.push(EntradaPage);
  }

}
