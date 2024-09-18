<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];

if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de TALLERES
require_once('../models/talleres.model.php');
//error_reporting(0);
$talleres = new Talleres;

switch ($_GET["op"]) {
        //TODO: operaciones de talleres

    case 'todos': //TODO: Procedimiento para cargar todos los datos
        $datos = array(); 
        $datos = $talleres->todos(); 
        $todos = null;
        while ($row = mysqli_fetch_assoc($datos))
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'uno': 
        $Talleres_id = $_POST["Talleres_id"];
        $datos = array();
        $datos = $talleres->uno($Talleres_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        
    case 'insertar':  
        $Nombre = $_POST["Nombre"];
        $Descripcion = $_POST["Descripcion"];
        $Fecha = $_POST["Fecha"];
        $Ubicacion = $_POST["Ubicacion"];
        $datos = array();
        $datos = $talleres->insertar($Nombre, $Descripcion, $Fecha, $Ubicacion);
        echo json_encode($datos);
        break;
        
    case 'actualizar':  
        $Talleres_id = $_POST["Talleres_id"];
        $Nombre = $_POST["Nombre"];
        $Descripcion = $_POST["Descripcion"];
        $Fecha = $_POST["Fecha"];
        $Ubicacion = $_POST["Ubicacion"];
        $datos = array();
        $datos = $talleres->actualizar($Talleres_id, $Nombre, $Descripcion, $Fecha, $Ubicacion);
        echo json_encode($datos);
        break;
        
    case 'eliminar': 
        $Talleres_id = $_POST["Talleres_id"];
        $datos = array();
        $datos = $talleres->eliminar($Talleres_id);
        echo json_encode($datos);
        break;
}