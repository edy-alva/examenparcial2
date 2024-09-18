import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TalleresService } from 'src/app/Services/talleres.service';
import { Italleres } from 'src/app/Interfaces/italleres';
@Component({
  selector: 'app-nuevotaller',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevotaller.component.html',
  styleUrl: './nuevotaller.component.scss'
})
export class NuevotallerComponent implements OnInit {
  frm_Taller = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Descripcion: new FormControl('', Validators.required),
    Fecha: new FormControl('', Validators.required),
    Ubicacion: new FormControl('', [Validators.required])
  });
  Talleres_id = 0;
  titulo = 'Nuevo Taller';
  constructor(
    private tallerServicio: TalleresService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Talleres_id = parseInt(this.ruta.snapshot.paramMap.get('Talleres_id'));
    if (this.Talleres_id > 0) {
      this.tallerServicio.uno(this.Talleres_id).subscribe((untaller) => {
        this.frm_Taller.controls['Nombre'].setValue(untaller.nombre);
        this.frm_Taller.controls['Descripcion'].setValue(untaller.descripcion);
        this.frm_Taller.controls['Fecha'].setValue(untaller.fecha.toString());
        this.frm_Taller.controls['Ubicacion'].setValue(untaller.ubicacion);
        this.titulo = 'Editar Taller';
      });
    }
  }

  grabar() {
    console.log(this.frm_Taller.controls['Fecha'].value);
    let taller: Italleres = {
      talleres_id: this.Talleres_id,
      nombre: this.frm_Taller.controls['Nombre'].value,
      descripcion: this.frm_Taller.controls['Descripcion'].value,
      fecha: new Date(this.frm_Taller.controls['Fecha'].value),
      ubicacion: this.frm_Taller.controls['Ubicacion'].value
    };

    Swal.fire({
      title: 'Talleres',
      text: 'Desea guardar el Taller: ' + this.frm_Taller.controls['Nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.Talleres_id > 0) {
          this.tallerServicio.actualizar(taller).subscribe((res: any) => {
            Swal.fire({
              title: 'Talleres',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/talleres']);
          });
        } else {
          this.tallerServicio.insertar(taller).subscribe((res: any) => {
            Swal.fire({
              title: 'Talleres',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/talleres']);
          });
        }
      }
    });
  }

}
