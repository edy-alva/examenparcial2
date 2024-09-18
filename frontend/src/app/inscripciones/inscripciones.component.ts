import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { InscripcionesService } from '../Services/inscripciones.service';
import Swal from 'sweetalert2';
import { IInscripciones } from '../Interfaces/iinscripciones';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {
  listainscripciones: IInscripciones[] = [];
  constructor(private inscripcionesServicio: InscripcionesService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.inscripcionesServicio.todos().subscribe((data) => {
      this.listainscripciones = data;
    });
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
