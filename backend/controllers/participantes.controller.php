<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];

if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de PARTICIPANTES
require_once('../models/participantes.model.php');
//error_reporting(0);
$participantes = new Participantes;

switch ($_GET["op"]) {
        //TODO: operaciones de participantes

    case 'todos': //TODO: Procedimiento para cargar todos los datos
        $datos = array(); 
        $datos = $participantes->todos(); 
        $todos = null;
        while ($row = mysqli_fetch_assoc($datos))
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'uno': 
        $Participantes_id = $_POST["Participantes_id"];
        $datos = array();
        $datos = $participantes->uno($Participantes_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        
    case 'insertar':  
        $Nombre = $_POST["Nombre"];
        $Apellido = $_POST["Apellido"];
        $Email = $_POST["Email"];
        $Telefono = $_POST["Telefono"];
        $datos = array();
        $datos = $participantes->insertar($Nombre, $Apellido, $Email, $Telefono);
        echo json_encode($datos);
        break;
        
    case 'actualizar':  
        $Participantes_id = $_POST["Participantes_id"];
        $Nombre = $_POST["Nombre"];
        $Apellido = $_POST["Apellido"];
        $Email = $_POST["Email"];
        $Telefono = $_POST["Telefono"];
        $datos = array();
        $datos = $participantes->actualizar($Participantes_id, $Nombre, $Apellido, $Email, $Telefono);
        echo json_encode($datos);
        break;
        
    case 'eliminar': 
        $Participantes_id = $_POST["Participantes_id"];
        $datos = array();
        $datos = $participantes->eliminar($Participantes_id);
        echo json_encode($datos);
        break;
}