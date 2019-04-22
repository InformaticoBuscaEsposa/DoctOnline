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

  addUsuario(user:string ,contraseña:string ,tipo:boolean, nombre:string, apellidos:string, email:string, nacionalidad:string, CP:number, direccion:string, SS:number)
  {
		let datosUsuario:Usuario=new Usuario();

    datosUsuario.user=user;
    datosUsuario.contraseña=contraseña;
    datosUsuario.tipo=tipo;
		datosUsuario.nombre=nombre;
		datosUsuario.apellidos=apellidos;
    datosUsuario.email=email;
    datosUsuario.nacionalidad=nacionalidad;
    datosUsuario.CodPostal=CP;
    datosUsuario.direccion=direccion;
    datosUsuario.SegSocial=SS;

		this.dbFirebase.guardaUsuario(datosUsuario).then(res=>{
			alert(datosUsuario.user+ " guardado en FB");


		});

  }

  ionViewDidEnterUsuarios()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  delUsuario(SS)
  {
	  this.dbFirebase.delUsuario(SS);
  }

  volverPaginaEntrada():void {
    this.navCtrl.pop();
  }

  enviarFormularioRegistro():void{
    var usuario = document.forms["registro"]["User"].value;
    if (usuario == "") {
      alert("Debes escribir tu nombre de usuario");
      return;
    }
    //Contraseñas coinciden
    var contraseña = document.forms["registro"]["Pass"].value;
    if(contraseña.length < 4){
      alert("Las contraseña es demasiado corta.");
      return;
    }
    var repContraseña = document.forms["registro"]["RepPass"].value;
    if(contraseña != repContraseña){
      alert("Las contraseñas no coinciden.");
      return;
    }
    //Tipo asignado según si es paciente o doctor
    var tipo;
    if (document.forms["registro"]["Tipo"].value == "PAC"){
      tipo = false;
    } else{
      tipo = true;
    }
    var nombre = document.forms["registro"]["Nom"].value;
    if (nombre == "") {
      alert("Debes escribir tu nombre");
      return;
    }
    var apellido = document.forms["registro"]["Ape"].value;
    var correo = document.forms["registro"]["Email"].value;
    if (usuario == "") {
      alert("Debes escribir tu correo");
      return;
    }
    var fecha = document.forms["registro"]["FNac"].value;
    var nacionalidad = document.forms["registro"]["Nac"].value;
    var codigoPostal = document.forms["registro"]["CP"].value;
    var direccion = document.forms["registro"]["Dir"].value;
    var seguridadSocial = document.forms["registro"]["SS"].value;
    if (!document.forms["registro"]["condiciones"].checked){
      alert("Debes aceptar nuestras condiciones");
      return;
    }
    this.addUsuario(usuario, contraseña, tipo, nombre, apellido, correo, nacionalidad, codigoPostal, direccion, seguridadSocial);
    alert("Te has registrado con éxito")
    this.volverPaginaEntrada();
    return;
  }

}
