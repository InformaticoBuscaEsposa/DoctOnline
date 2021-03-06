import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';
import {FormularioSintomasPage} from '../formularioSintomas/formularioSintomas';
import {DiagnosticoPage} from '../diagnostico/diagnostico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  ionViewDidEnter()
  {
    this.dbFirebase.getDiagnosticos(this.nombre).subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  irPaginaCrearDiagnostico(){
    this.navCtrl.push(FormularioSintomasPage, {nombre:this.nombre});
  }

  irPaginaDiagnostico(id){
    this.navCtrl.push(DiagnosticoPage, {nombre:this.nombre, id:id});
  }

  truncarSintoma(sintoma):string{
    var subcadena = sintoma.toString();
    if(subcadena.length > 30){
      subcadena = subcadena.substr(0, 30);
      subcadena = subcadena + "...";
    }
    return subcadena;
  }

}
