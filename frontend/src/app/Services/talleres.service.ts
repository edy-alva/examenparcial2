import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Italleres } from '../Interfaces/italleres';


@Injectable({
  providedIn: 'root'
})
export class TalleresService {
  apiurl = 'https://localhost/examen/examenparcial2/backend/controllers/talleres.controller.php?op=';
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<Italleres> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<Italleres>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<Italleres[]> {
    return this.lector.get<Italleres[]>(this.apiurl + 'todos');
  }
  uno(talleres_id: number): Observable<Italleres> {
    const formData = new FormData();
    formData.append('talleres_id', talleres_id.toString());
    return this.lector.post<Italleres>(this.apiurl + 'uno', formData);
  }
  eliminar(talleres_id: number): Observable<number> {
//Todo: verificar si no tiene relacion antes de eliminar

    const formData = new FormData();
    formData.append('talleres_id', talleres_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(taller: Italleres): Observable<string> {
    console.log(taller);
    let fechaFormateada = `${taller.fecha.getFullYear()}-${(taller.fecha.getMonth() + 1).toString().padStart(2, '0')}-${taller.fecha.getDate().toString().padStart(2, '0')}`;
    const formData = new FormData();
    formData.append('nombre', taller.nombre);
    formData.append('descripcion', taller.descripcion);
    formData.append('fecha', fechaFormateada);
    formData.append('ubicacion', taller.ubicacion);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(taller: Italleres): Observable<string> {
    const formData = new FormData();   
    let fechaFormateada = `${taller.fecha.getFullYear()}-${(taller.fecha.getMonth() + 1).toString().padStart(2, '0')}-${taller.fecha.getDate().toString().padStart(2, '0')}`;
    formData.append('talleres_id', taller.talleres_id.toString());
    formData.append('nombre', taller.nombre);
    formData.append('descripcion', taller.descripcion);
    formData.append('fecha', fechaFormateada);
    formData.append('ubicacion', taller.ubicacion);
    console.log(formData);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
