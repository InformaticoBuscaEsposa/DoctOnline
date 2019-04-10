export class Usuario {

	public user: string;
	public tipo: boolean; //0 paciente y 1 doctor//
  public nombre: string;
  public apellidos: string;
  public email: string;
	public nacionalidad: string;
	public CodPostal: number;
	public direccion: string;
	public SegSocial: number;
	
	constructor()
	{
		this.SegSocial=0;
	}

}
