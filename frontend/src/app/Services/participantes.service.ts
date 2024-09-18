import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParticipantes } from '../Interfaces/iparticipantes';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {
  apiurl = 'https://localhost/examen/examenparcial2/backend/controllers/participantes.controller.php?op=';
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<IParticipantes> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IParticipantes>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<IParticipantes[]> {
    return this.lector.get<IParticipantes[]>(this.apiurl + 'todos');
  }
  uno(participantes_id: number): Observable<IParticipantes> {
    const formData = new FormData();
    formData.append('Participantes_id', participantes_id.toString());
    return this.lector.post<IParticipantes>(this.apiurl + 'uno', formData);
  }
  eliminar(participantes_id: number): Observable<number> {
//Todo: verificar si no tiene relacion antes de eliminar
    const formData = new FormData();
    formData.append('Participantes_id', participantes_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(participante: IParticipantes): Observable<string> {
    const formData = new FormData();
    formData.append('Nombre', participante.nombre);
    formData.append('Apellido', participante.apellido);
    formData.append('Email', participante.email);
    formData.append('Telefono', participante.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(participante: IParticipantes): Observable<string> {
    const formData = new FormData();   
    formData.append('Participantes_id', participante.participantes_id.toString());
    formData.append('Nombre', participante.nombre);
    formData.append('Apellido', participante.apellido);
    formData.append('Email', participante.email);
    formData.append('Telefono', participante.telefono);
    console.log(formData);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}

