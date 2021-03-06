import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';
import {FormularioSintomasPage} from '../formularioSintomas/formularioSintomas';
import {DiagnosticoPage} from '../diagnostico/diagnostico';
import {BusquedaDiagnosticoPage} from '../busquedaDiagnostico/busquedaDiagnostico';

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

  ionViewDidEnter()
  {
    this.dbFirebase.getUsuarios().subscribe(listaUsuarios=>{this.listaUsuarios=listaUsuarios;});
    this.dbFirebase.getAllDiagnosticos().subscribe(listaDiagnosticos=>{this.listaDiagnosticos=listaDiagnosticos;});
  }

  seleccionarDiagnosticos():any
  {
    var indicesEliminar: number[] = [];
    var numeroEliminaciones=0;
    for(let listaItem of this.listaDiagnosticos){
      for(let diagnostico of listaItem){
        if(diagnostico.doctor != this.nombre){
          indicesEliminar.push(diagnostico.id-numeroEliminaciones);
          numeroEliminaciones++;
        }
      }
      for(let i of indicesEliminar){
        listaItem.splice(i, 1);
      }
      indicesEliminar = [];
      numeroEliminaciones;
    }
    return this.listaDiagnosticos;
  }

  irPaginaBuscarDiagnostico(){
    this.navCtrl.push(BusquedaDiagnosticoPage, {nombre:this.nombre});
  }

  irPaginaDiagnostico(nombrePaciente, id){
    this.navCtrl.push(DiagnosticoPage, {nombre:nombrePaciente, id:id});
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
