import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-inicioSesion',
  templateUrl: 'inicioSesion.html'
})
export class InicioSesionPage {

  listaUsuarios:any;

  constructor(public navCtrl: NavController,public dbFirebase:FirebaseDbProvider) {

  }


  ionViewDidEnter()
  {
	  this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
  }

  delUsuario(user)
  {
	  this.dbFirebase.delUsuario(user);
  }


  enviarFormularioInicioSesion():void{
    var nombreUsuario = document.forms["cuadro"]["Usuario"].value;
    var contraseña = document.forms["cuadro"]["Contraseña"].value;
    this.ionViewDidEnter();
    for(let usuario of this.listaUsuarios){
      if(usuario.user == nombreUsuario){
        if(usuario.contraseña == contraseña){
          alert("Bienvenido, " + nombreUsuario)
          //Pasamos a Home de paciente (tipo 0) o de doctor (tipo 1) y le damos como parámetro el usuario
          if(usuario.tipo == 0){
            this.navCtrl.push(HomePage, {nombre:usuario.user});
          }
          return;
        }
      }
    }
    alert("Has escrito mal el nombre de usuario o la contraseña")
    return;
  }

}
