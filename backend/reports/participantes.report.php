<?php
require_once 'fpdf/fpdf.php';


require_once '../models/inscripciones.model.php';
require_once '../models/participantes.model.php';
require_once '../models/talleres.model.php';

/*class Reportes
{

    public function generaReporte($Taller_id)
    {
 //$idTaller = $Taller_id;

*/
       

        $idTaller = $_GET["Talleres_id"];

        $inscripciones = new Inscripciones();
        $participantes = new Participantes();
        $talleres = new Talleres();

        //Obtenemos los datos del Taller
        $datosTaller = mysqli_fetch_assoc($talleres->uno($idTaller));

        //Obtenemos el listado de participantes
        $listadoInscripciones = $inscripciones->listadoInscripcionesTaller($datosTaller['talleres_id']);


        $pdf = new FPDF();
        $pdf->AddPage();
        $pdf->Image('https://img.freepik.com/free-vector/flat-design-ac-logo-design_23-2149482027.jpg', 150, 10, 40, 40, 'JPG');

        $pdf->SetFont('Arial','B',15);
        $pdf->Text(80, 17, iconv('UTF-8','Windows-1252', 'Listado de Participantes'));

        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->SetFont('Arial','B',10);
        $pdf->Text(10, 25, iconv('UTF-8','Windows-1252', 'Nombre Evento: '));
        $pdf->Text(10, 30, iconv('UTF-8','Windows-1252', 'Descripcion: '));
        $pdf->Text(10, 35, iconv('UTF-8','Windows-1252', 'Fecha del Evento: '));
        $pdf->Text(10, 40, iconv('UTF-8','Windows-1252', 'Ubicacion: '));

        $pdf->SetFont('Arial','',10);
        $pdf->Text(50, 25, iconv('UTF-8','Windows-1252', $datosTaller['nombre']));
        $pdf->Text(50, 30, iconv('UTF-8','Windows-1252', $datosTaller['descripcion']));
        $pdf->Text(50, 35, iconv('UTF-8','Windows-1252', $datosTaller['fecha']));
        $pdf->Text(50, 40, iconv('UTF-8','Windows-1252', $datosTaller['ubicacion']));

        $x = 20;
        $y = 50;
        $altoCelda = 7;
        //Colocamos el encabezado del detalle
        $pdf->SetFont('Arial','B',10);
        $pdf->SetXY(10,60);
        $pdf->Cell(10, $altoCelda, 'No', 1, 0, 'C');
        $pdf->Cell(50, $altoCelda, 'Apellido', 1, 0, 'C');
        $pdf->Cell(50, $altoCelda, 'Nombre', 1, 0, 'C');
        $pdf->Cell(50, $altoCelda, 'Correo', 1, 0, 'C');
        $pdf->Cell(30, $altoCelda, 'Estado', 1, 0, 'C');
        $pdf->Ln();


        //Colocamos el listado de participantes
        $pdf->SetFont('Arial','',10);


        $index = 1;
        while ($inscripcion = mysqli_fetch_assoc($listadoInscripciones)) {

            //obtenemos los datos
            $datosParticipante = mysqli_fetch_assoc($participantes->uno($inscripcion['participantes_participantes_id']));
            
            $pdf->Cell(10, $altoCelda, $index, 1, 0, 'C');
            $pdf->Cell(50, $altoCelda, $datosParticipante['apellido'], 1, 0, 'C');
            $pdf->Cell(50, $altoCelda, $datosParticipante['nombre'], 1, 0, 'C');
            $pdf->Cell(50, $altoCelda,  $datosParticipante['email'], 1, 0, 'C');
            $estado = 'Reservado';
            if ($inscripcion['estado'] == 1) {
                $estado = 'Confirmado';
            } else if ($inscripcion['estado'] == 2)
            {
                $estado = 'Cancelado';
            }
            $pdf->Cell(30, $altoCelda,  $estado, 1, 0, 'C');
            $pdf->Ln();
            $y += 7;
            $index++;
        };

        $pdf->Ln();
        $pdf->Ln();
        $pdf->SetX(90);
        $pdf->Cell(30, $altoCelda, 'Gracias por su Asistencia', 0, 0, 'C');
        $pdf->SetY($pdf->GetPageHeight() - 40);
        $pdf->SetX(100);
        $pdf->SetFont('Arial','',8);

        $pdf->Cell(20, 10, 'Pagina '.$pdf->PageNo(), 0, 0, 'C');
        $pdf->Output('', 'listaParticipantes.pdf');
 /*   
}

}

*/
