export class Usuario {

	public user: string;
	public contraseña: string;
	public tipo: boolean; //false paciente y true doctor//
  public nombre: string;
  public apellidos: string;
  public email: string;
	public nacionalidad: string;
	public CodPostal: number;
	public direccion: string;
	public SegSocial: number;

	constructor()
	{
		this.user="";
	}

}
