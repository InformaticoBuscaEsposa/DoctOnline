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
	  return this.afDB.database.ref('Usuarios/'+usuario.user).set(usuario);
  }

  private UsuariosRef=this.afDB.list<Usuario>('Usuarios');

  getUsuarios()
  {
        return this.UsuariosRef.valueChanges();
  }

  delUsuario(user)
  {
	  this.afDB.database.ref('Usuarios/'+user).remove();
  }

  //Sobre el diagnostico
  guardaDiagnostico(diagnostico:Diagnostico)
  {
	  return this.afDB.database.ref('Diagnostico/'+diagnostico.paciente + '/' + diagnostico.id).set(diagnostico);
  }

  //La referencia debe ser dinámica


  getDiagnosticos(paciente)
  {
      var DiagnosticosRef=this.afDB.list<Diagnostico>('Diagnostico/' + paciente);
      return DiagnosticosRef.valueChanges();
  }

  getAllDiagnosticos()
  {
      var DiagnosticosRef=this.afDB.list<Diagnostico>('Diagnostico');
      return DiagnosticosRef.valueChanges();
  }

  delDiagnostico(paciente, id)
  {
	  this.afDB.database.ref('Diagnostico/' + paciente + '/' + id).remove();
  }


}
