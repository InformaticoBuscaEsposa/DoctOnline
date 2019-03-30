import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {Cliente} from '../../models/cliente.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listaClientes:any;
	
  constructor(public navCtrl: NavController,public dbFirebase:FirebaseDbProvider) {

  }
  
  addCliente2()
  {
		let datoscliente:Cliente=new Cliente();
	  
		datoscliente.nombre="Pepe";
		datoscliente.apellidos="San Juan";
	  
		this.dbFirebase.guardaCliente(datoscliente).then(res=>{
			alert(datoscliente.id+ " guardado en FB");
		});
	  
  }
  
  updateCliente(id)
  {
	  let datoscliente:Cliente=new Cliente();
	  datoscliente.id=id;
	  datoscliente.nombre="Maria";
	  datoscliente.apellidos="de las mercedes";
	  
	  this.dbFirebase.guardaCliente(datoscliente);
  }
  
  ionViewDidEnter()
  {
	  this.dbFirebase.getClientes().subscribe(listaClientes=>{this.listaClientes=listaClientes;});
  }
   
  delCliente(id)
  {
	  this.dbFirebase.delCliente(id);
  }

}
