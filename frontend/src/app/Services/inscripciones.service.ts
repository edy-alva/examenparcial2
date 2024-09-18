import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInscripciones } from '../Interfaces/iinscripciones';

@Injectable({
  providedIn: 'root'
})

export class InscripcionesService {
  apiurl = 'https://localhost/examen/examenparcial2/backend/controllers/inscripciones.controller.php?op=';
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<IInscripciones> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IInscripciones>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<IInscripciones[]> {
    return this.lector.get<IInscripciones[]>(this.apiurl + 'todos');
  }

  uno(inscripciones_id: number): Observable<IInscripciones> {
    const formData = new FormData();
    formData.append('inscripciones_id', inscripciones_id.toString());
    return this.lector.post<IInscripciones>(this.apiurl + 'uno', formData);
  }

  eliminar(inscripciones_id: number): Observable<number> {
//Todo: verificar si no tiene relacion antes de eliminar

    const formData = new FormData();
    formData.append('inscripciones_id', inscripciones_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(inscripcion: IInscripciones): Observable<string> {
    console.log(inscripcion);
    const formData = new FormData();
    formData.append('estado', inscripcion.estado.toString());
    formData.append('participantes_participantes_id', inscripcion.participantes_participantes_id.toString());
    formData.append('talleres_talleres_id', inscripcion.talleres_talleres_id.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(inscripcion: IInscripciones): Observable<string> {
    const formData = new FormData();   
    formData.append('inscripciones_id', inscripcion.inscripciones_id.toString());
    formData.append('estado', inscripcion.estado.toString());
    formData.append('participantes_participantes_id', inscripcion.participantes_participantes_id.toString());
    formData.append('talleres_talleres_id', inscripcion.talleres_talleres_id.toString());
    console.log(formData);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}

