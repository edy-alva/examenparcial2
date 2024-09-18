import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TalleresService } from '../Services/talleres.service';
import Swal from 'sweetalert2';
import { Italleres } from '../Interfaces/italleres';

@Component({
  selector: 'app-talleres',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './talleres.component.html',
  styleUrl: './talleres.component.scss'
})
export class TalleresComponent {
  listatalleres: Italleres[] = [];
  constructor(private talleresServicio: TalleresService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.talleresServicio.todos().subscribe((data) => {
      this.listatalleres = data;
    });
  }

  eliminar(Talleres_id) {
    Swal.fire({
      title: 'talleres',
      text: 'Esta seguro que desea eliminar el taller!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Taller'
    }).then((result) => {
      if (result.isConfirmed) {
        this.talleresServicio.eliminar(Talleres_id).subscribe((data) => {
          Swal.fire('talleres', 'El taller ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }

  imprimir(Talleres_id) {}
}
