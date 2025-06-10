
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  http = inject(HttpClient);
  constructor() { }
  urlBase = environment.URL +'api';

  public ObtenerTodo(entidad: string){
    console.log("uuu")
    return this.http.get<any>(`${this.urlBase}/${entidad}`);
  }
  public Crear(entidad: string, objeto: any){
    return this.http.post<any>(`${this.urlBase}/${entidad}`, objeto);
  }

}
