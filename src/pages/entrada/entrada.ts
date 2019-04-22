import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {InicioSesionPage} from '../inicioSesion/inicioSesion';
import {RegistroPage} from '../registro/registro';


@Component({
  selector: 'page-entrada',
  templateUrl: 'entrada.html'
})
export class EntradaPage {

  constructor(public navCtrl: NavController,public dbFirebase:FirebaseDbProvider) {
  }

  irPaginaInicioSesion():void {
    this.navCtrl.push(InicioSesionPage);
  }
  irPaginaRegistro():void {
    this.navCtrl.push(RegistroPage);
  }

}
