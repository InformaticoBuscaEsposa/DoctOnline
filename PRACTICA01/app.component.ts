import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'Micropráctica ANGULAR - 01';
  
  private productos:Array<[string,number]>=[['Arroz tres delicias',3.50],['Cerdo agridulce',5.50],['Ternera con bambu y setas',7.00]];
    
  public codProducto=-1;
  public importe:number=0.0;
   
  public lineas:Array<[string,number]>=[];
  
  public addLinea()
  {
	  var producto=this.productos[this.codProducto][0];
	  var precio:number=this.productos[this.codProducto][1];
	  this.lineas.push([producto,precio]);
	  this.importe=this.importe+precio;
  }
  
  public delLinea(i)
  {
	  this.importe-=this.lineas[i][1];
	  this.lineas.splice(i,1);
  }
}
