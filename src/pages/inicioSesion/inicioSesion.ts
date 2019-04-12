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

  irPaginaHome():void {
    this.navCtrl.push(HomePage);
  }
}
