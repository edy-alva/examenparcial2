import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantesService } from 'src/app/Services/participantes.service';
import { IParticipantes } from 'src/app/Interfaces/iparticipantes';

@Component({
  selector: 'app-nuevoparticipante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevoparticipante.component.html',
  styleUrl: './nuevoparticipante.component.scss'
})
export class NuevoparticipanteComponent implements OnInit {
  frm_Participante = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required,Validators.email]),
    Telefono: new FormControl('', [Validators.required])
  });
  Participantes_id = 0;
  titulo = 'Nuevo Participante';
  constructor(
    private participanteServicio: ParticipantesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Participantes_id = parseInt(this.ruta.snapshot.paramMap.get('Participante_id'));
console.log('ID: '+this.Participantes_id);

    if (this.Participantes_id > 0) {
      this.participanteServicio.uno(this.Participantes_id).subscribe((unparticipante) => {
        this.frm_Participante.controls['Nombre'].setValue(unparticipante.nombre);
        this.frm_Participante.controls['Apellido'].setValue(unparticipante.apellido);
        this.frm_Participante.controls['Email'].setValue(unparticipante.email);
        this.frm_Participante.controls['Telefono'].setValue(unparticipante.telefono);
        this.titulo = 'Editar Participante';
      });
    }
  }

  grabar() {
    let participante: IParticipantes = {
      participantes_id: this.Participantes_id,
      nombre: this.frm_Participante.controls['Nombre'].value,
      apellido: this.frm_Participante.controls['Apellido'].value,
      email: this.frm_Participante.controls['Email'].value,
      telefono: this.frm_Participante.controls['Telefono'].value
    };

    Swal.fire({
      title: 'Participantes',
      text: 'Desea guardar el Participante: ' + this.frm_Participante.controls['Nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.Participantes_id > 0) {
          this.participanteServicio.actualizar(participante).subscribe((res: any) => {
            Swal.fire({
              title: 'Participantes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/participantes']);
          });
        } else {
          this.participanteServicio.insertar(participante).subscribe((res: any) => {
            Swal.fire({
              title: 'Participantes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/participantes']);
          });
        }
      }
    });
  }

}

