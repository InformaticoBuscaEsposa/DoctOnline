
export enum EstadoCoche {BUENO, MALO}

export class Coche {
	
	public marca:string;
	public modelo:string;
	public fecha_modelo:Date;
	public fecha_venta:Date;
	public precio:number;	
	public foto:string;
	public estado:EstadoCoche;
	
	constructor(marca:string,modelo:string,fecha_modelo:Date,fecha_venta:Date,precio:number,foto:string,estado:EstadoCoche)
	{
		this.marca=marca;
		this.modelo=modelo;
		this.fecha_modelo=fecha_modelo;
		this.fecha_venta=fecha_venta;
		this.precio=precio;
		this.foto=foto;
		this.estado=estado;
	}
	
	public getPVP():number{
		return this.precio*1.21;
	}
	
	public rebajar(){
		this.precio*=0.90;
	}
}