import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { InscripcionesService } from '../Services/inscripciones.service';
import Swal from 'sweetalert2';
import { IInscripciones } from '../Interfaces/iinscripciones';
import { IParticipantes } from '../Interfaces/iparticipantes';
import { Italleres } from '../Interfaces/italleres';
import { ParticipantesService } from '../Services/participantes.service';
import { TalleresService } from '../Services/talleres.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {
  listainscripciones: IInscripciones[] = [];
  listaparticipantes: IParticipantes[] = [];
  listatalleres: Italleres[] = [];

  constructor(
    private inscripcionesServicio: InscripcionesService, 
    private participantesServicio: ParticipantesService, 
    private talleresServicio: TalleresService
  ) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.inscripcionesServicio.todos().subscribe((data) => { this.listainscripciones = data; });
    this.participantesServicio.todos().subscribe((data) => { this.listaparticipantes = data; });
    this.talleresServicio.todos().subscribe((data) => { this.listatalleres = data; });
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

  eliminar(Inscripciones_id) {
    Swal.fire({
      title: 'Inscripciones',
      text: 'Esta seguro que desea eliminar la inscripcion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Inscripcion'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscripcionesServicio.eliminar(Inscripciones_id).subscribe((data) => {
          Swal.fire('Inscripciones', 'La inscripcion ha sido eliminada.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
