<?php
require_once 'fpdf/fpdf.php';

/*
require '../models/productos.model.php';
require '../models/factura.model.php';
require '../models/kardex.model.php';
require '../models/clientes.model.php';
require '../models/detalle_factura.model.php';

//Configurar el ID de la factura
$idFactura = 1;

$producto = new Productos();
$factura = new Factura();
$facturaDetalle = new Detalle_Factura();
$kardex = new Kardex();
$cliente = new Clientes();


//Obtenemos los datos de la Factura
$datosFactura = mysqli_fetch_assoc($factura->uno($idFactura));

//Obtenemos los datos del Cliente
$datosCliente = mysqli_fetch_assoc($cliente->uno($datosFactura['Clientes_idClientes']));

$pdf = new FPDF();
$pdf->AddPage();
$pdf->Image('https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg', 150, 10, 40, 40, 'JPG');

$pdf->SetFont('Arial','B',15);
$pdf->Text(90, 17, iconv('UTF-8','Windows-1252', 'Factura No: '.$idFactura));

$pdf->Ln();
$pdf->SetFont('Arial','B',10);
$pdf->Text(10, 25, iconv('UTF-8','Windows-1252', 'Fecha: '));
$pdf->Text(10, 30, iconv('UTF-8','Windows-1252', 'Cliente: '));
$pdf->Text(10, 35, iconv('UTF-8','Windows-1252', 'Cedula: '));
$pdf->Text(10, 40, iconv('UTF-8','Windows-1252', 'Dirección: '));
$pdf->Text(10, 45, iconv('UTF-8','Windows-1252', 'Telefono: '));
$pdf->Text(10, 50, iconv('UTF-8','Windows-1252', 'Correo: '));
$pdf->SetFont('Arial','',10);
$pdf->Text(30, 25, iconv('UTF-8','Windows-1252', $datosFactura['Fecha']));
$pdf->Text(30, 30, iconv('UTF-8','Windows-1252', $datosCliente['Nombres']));
$pdf->Text(30, 35, iconv('UTF-8','Windows-1252', $datosCliente['Cedula']));
$pdf->Text(30, 40, iconv('UTF-8','Windows-1252', $datosCliente['Direccion']));
$pdf->Text(30, 45, iconv('UTF-8','Windows-1252', $datosCliente['Telefono']));
$pdf->Text(30, 50, iconv('UTF-8','Windows-1252', $datosCliente['Correo']));

$x = 20;
$y = 50;
$altoCelda = 7;
//Colocamos el encabezado del detalle
$pdf->SetFont('Arial','B',10);
$pdf->SetXY(10,60);
$pdf->Cell(10, $altoCelda, 'No', 1, 0, 'C');
$pdf->Cell(100, $altoCelda, 'Producto', 1, 0, 'C');
$pdf->Cell(20, $altoCelda, 'Cantidad', 1, 0, 'C');
$pdf->Cell(30, $altoCelda, 'Precio Unit.', 1, 0, 'C');
$pdf->Cell(30, $altoCelda, 'Precio Total', 1, 0, 'C');
$pdf->Ln();

//Colocamos el listado de productos
$pdf->SetFont('Arial','',10);
$listaproductos = $facturaDetalle->listaDetalle($idFactura);   
$index = 1;
while ($prod = mysqli_fetch_assoc($listaproductos)) {

    //obtenemos los datos del producto
    $datosKardex = mysqli_fetch_assoc($kardex->uno($prod['Kardex_idKardex']));
    $datosProducto = mysqli_fetch_assoc($producto->uno($datosKardex['Productos_idProductos']));
    $pdf->Cell(10, $altoCelda, $index, 1, 0, 'C');
    $pdf->Cell(100, $altoCelda, $datosProducto['Nombre_Producto'], 1, 0, 'C');
    $pdf->Cell(20, $altoCelda, $prod['Cantidad'], 1, 0, 'C');
    $pdf->Cell(30, $altoCelda,  $prod['Precio_Unitario'], 1, 0, 'C');
    $pdf->Cell(30, $altoCelda,  $prod['Sub_Total_item'], 1, 0, 'C');
    $pdf->Ln();
    $y += 7;
    $index++;
};

//Colocamos los totales
$pdf->SetX(140);$pdf->SetFont('Arial','B',10);
$pdf->Cell(30, $altoCelda, 'Sub Total', 1, 0, 'C');
$pdf->SetFont('Arial','',10);
$pdf->Cell(30, $altoCelda, $datosFactura['Sub_total'], 1, 0, 'C');
$pdf->Ln();$pdf->SetX(140);$pdf->SetFont('Arial','B',10);
$pdf->Cell(30, $altoCelda, 'IVA %', 1, 0, 'C');
$pdf->SetFont('Arial','',10);
$pdf->Cell(30, $altoCelda, $datosFactura['Valor_IVA'], 1, 0, 'C');
$pdf->Ln();$pdf->SetX(140);$pdf->SetFont('Arial','B',10);

$pdf->Cell(30, $altoCelda, 'Valor IVA', 1, 0, 'C');
$pdf->SetFont('Arial','',10);
$pdf->Cell(30, $altoCelda, $datosFactura['Sub_total_iva'], 1, 0, 'C');
$pdf->Ln();$pdf->SetX(140);$pdf->SetFont('Arial','B',10);

$pdf->Cell(30, $altoCelda, 'Total', 1, 0, 'C');
$pdf->SetFont('Arial','I',10);
$pdf->Cell(30, $altoCelda, $datosFactura['Sub_total'] + $datosFactura['Valor_IVA'] + $datosFactura['Sub_total_iva'], 1, 0, 'C');
$pdf->Ln();
$pdf->Ln();
$pdf->SetX(90);
$pdf->Cell(30, $altoCelda, 'Gracias por su Compra', 0, 0, 'C');
$pdf->SetY($pdf->GetPageHeight() - 40);
$pdf->SetX(100);
$pdf->SetFont('Arial','',8);
$pdf->Cell(20, 10, 'Pagina '.$pdf->PageNo(), 0, 0, 'C');
$pdf->Output('D', 'facturaEalvarado.pdf');
*/
