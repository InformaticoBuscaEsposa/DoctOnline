//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import {Usuario} from '../../models/usuario.model';
import {Diagnostico} from '../../models/diagnostico.model';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

  constructor(public afDB:AngularFireDatabase) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  //Sobre el usuario
  guardaUsuario(usuario:Usuario)
  {
	  return this.afDB.database.ref('Usuarios/'+usuario.dni).set(usuario);
  }

  private UsuariosRef=this.afDB.list<Usuario>('Usuarios');

  getUsuarios()
  {
        return this.UsuariosRef.valueChanges();
  }

  delUsuario(dni)
  {
	  this.afDB.database.ref('Usuarios/'+dni).remove();
  }

  //Sobre el diagnostico
  guardaDiagnostico(diagnostico:Diagnostico)
  {
	  return this.afDB.database.ref('Diagnostico/'+diagnostico.paciente + '/' + diagnostico.id).set(diagnostico);
  }

  private DiagnosticosRef=this.afDB.list<Diagnostico>('Diagnosticos');

  getDiagnosticos()
  {
        return this.DiagnosticosRef.valueChanges();
  }

} 
