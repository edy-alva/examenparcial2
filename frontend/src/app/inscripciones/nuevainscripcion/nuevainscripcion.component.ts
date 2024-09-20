import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from 'src/app/Services/inscripciones.service';
import { IInscripciones } from 'src/app/Interfaces/iinscripciones';
import { ParticipantesService } from 'src/app/Services/participantes.service';
import { TalleresService } from 'src/app/Services/talleres.service';
import { Italleres } from 'src/app/Interfaces/italleres';
import { IParticipantes } from 'src/app/Interfaces/iparticipantes';

@Component({
  selector: 'app-nuevainscripcion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevainscripcion.component.html',
  styleUrl: './nuevainscripcion.component.scss'
})
export class NuevainscripcionComponent implements OnInit {
  frm_Inscripcion = new FormGroup({
    Taller: new FormControl('', Validators.required),
    Participante: new FormControl('', Validators.required),
    Estado: new FormControl('', Validators.required),
  });

  options: string[] = ['Reservado', 'Confirmado', 'Cancelado'];


  Inscripciones_id = 0;
  titulo = 'Nueva Inscripcion';
  constructor(
    private inscripcionServicio: InscripcionesService,
    private navegacion: Router,
    private ruta: ActivatedRoute,
    private participantesServicio: ParticipantesService, 
    private talleresServicio: TalleresService
  ) {}

  ngOnInit(): void {
    this.Inscripciones_id = parseInt(this.ruta.snapshot.paramMap.get('Inscripcion_id'));
    console.log(this.Inscripciones_id);
    if (this.Inscripciones_id > 0) {
      this.inscripcionServicio.uno(this.Inscripciones_id).subscribe((unainscripcion) => {
        this.frm_Inscripcion.controls['Participante'].setValue(unainscripcion.participantes_participantes_id.toString());
        this.frm_Inscripcion.controls['Taller'].setValue(unainscripcion.talleres_talleres_id.toString());
        this.frm_Inscripcion.controls['Estado'].setValue(unainscripcion.estado.toString());
        this.titulo = 'Editar Inscripcion';
      });
    }
  }

  grabar() {
    let inscripcion: IInscripciones = {
      inscripciones_id: this.Inscripciones_id,
      participantes_participantes_id: parseInt(this.frm_Inscripcion.controls['Participante'].value),
      talleres_talleres_id: parseInt(this.frm_Inscripcion.controls['Taller'].value),
      estado: parseInt(this.frm_Inscripcion.controls['Estado'].value)
    };

    
    Swal.fire({
      title: 'Inscripciones',
      text: 'Desea guardar la Inscripcion: ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.Inscripciones_id > 0) {
          this.inscripcionServicio.actualizar(inscripcion).subscribe((res: any) => {
            Swal.fire({
              title: 'Inscripciones',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/inscripciones']);
          });
        } else {
          this.inscripcionServicio.insertar(inscripcion).subscribe((res: any) => {
            Swal.fire({
              title: 'Inscripciones',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/inscripciones']);
          });
        }
      }
    });
  }

  devuelveParticipante(idParticipante:number): IParticipantes {
    let participante: IParticipantes;
    this.participantesServicio.uno(idParticipante).subscribe((data) => { participante = data; });
    return participante;
  }
  
  devuelveTaller(idTaller:number): Italleres {
    let taller: Italleres;
    this.talleresServicio.uno(idTaller).subscribe((data) => { taller = data; });
    return taller;
  }

}
