
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ParticipantesService } from '../Services/participantes.service';
import Swal from 'sweetalert2';
import { IParticipantes } from '../Interfaces/iparticipantes';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss'
})
export class ParticipantesComponent {
  listaparticipantes: IParticipantes[] = [];
  constructor(private participantesServicio: ParticipantesService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.participantesServicio.todos().subscribe((data) => {
      this.listaparticipantes = data;
    });
  }

  eliminar(Participantes_id) {
    Swal.fire({
      title: 'participantes',
      text: 'Esta seguro que desea eliminar el participante!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Participante'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participantesServicio.eliminar(Participantes_id).subscribe((data) => {
          Swal.fire('participantes', 'El participante ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
