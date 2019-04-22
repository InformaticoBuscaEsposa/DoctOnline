import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';
import {FormularioSintomasPage} from '../formularioSintomas/formularioSintomas';
import {DiagnosticoPage} from '../diagnostico/diagnostico';

@Component({
  selector: 'page-homeD',
  templateUrl: 'homeD.html'
})
export class HomeDPage {

  //Sobre usuarios
  listaUsuarios:any = 0;
  nombre = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public dbFirebase:FirebaseDbProvider) {
    this.nombre = navParams.get('nombre');
  }

  delUsuario(user)
  {
	  this.dbFirebase.delUsuario(user);
  }


  //Sobre diagnosticos
  listaDiagnosticos:any = 0;

  /*
  ionViewDidEnterDiagnosticos(usuario)
  {
    var promise = new Promise((resolve, reject) => {
      this.dbFirebase.getDiagnosticos(usuario).subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
      resolve();
    });
    return promise;
  }

  seleccionarDiagnosticos(usuario)
  {
    this.listaDiagnosticos = 0;
    this.ionViewDidEnterDiagnosticos(usuario).then(
      function(){
        for(let diagnostico of this.listaDiagnosticos){
          if(diagnostico.doctor != this.nombre){
            this.listaDiagnosticos.splice(diagnostico.id, 1);
          }
        }
      }
    );
  }
  */
  ionViewDidEnter()
  {
    this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
    this.dbFirebase.getAllDiagnosticos().subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  seleccionarDiagnosticos()
  {
    for(let listaItem of this.listaDiagnosticos){
      for(let diagnostico of listaItem){
        if(diagnostico.doctor != this.nombre){
          this.listaDiagnosticos.splice(diagnostico.id, 1);
        }
      }
    }
  }

  irPaginaCrearDiagnostico(){
    this.navCtrl.push(FormularioSintomasPage, {nombre:this.nombre});
  }

  irPaginaDiagnostico(id){
    this.navCtrl.push(DiagnosticoPage, {nombre:this.nombre}, {id:id});
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
