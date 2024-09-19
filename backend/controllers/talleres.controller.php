<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];

if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de talleres
require_once('../models/talleres.model.php');

//error_reporting(0);
$talleres = new talleres;

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
        $talleres_id = $_POST["talleres_id"];
        $datos = array();
        $datos = $talleres->uno($talleres_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        
    case 'insertar':  
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha = $_POST["fecha"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $talleres->insertar($nombre, $descripcion, $fecha, $ubicacion);
        echo json_encode($datos);
        break;
        
    case 'actualizar':  
        $talleres_id = $_POST["talleres_id"];
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fecha = $_POST["fecha"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $talleres->actualizar($talleres_id, $nombre, $descripcion, $fecha, $ubicacion);
        echo json_encode($datos);
        break;
        
    case 'eliminar': 
        $talleres_id = $_POST["talleres_id"];
        $datos = array();
        $datos = $talleres->eliminar($talleres_id);
        echo json_encode($datos);
        break;
}