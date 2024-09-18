import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from 'src/app/Services/inscripciones.service';
import { IInscripciones } from 'src/app/Interfaces/iinscripciones';

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
  Inscripciones_id = 0;
  titulo = 'Nueva Inscripcion';
  constructor(
    private inscripcionServicio: InscripcionesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Inscripciones_id = parseInt(this.ruta.snapshot.paramMap.get('Inscripciones_id'));
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
      participantes_participantes_id: this.frm_Inscripcion.controls['participantes_participantes_id'].value,
      talleres_talleres_id: this.frm_Inscripcion.controls['talleres_talleres_id'].value,
      estado: this.frm_Inscripcion.controls['estado'].value
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

}
