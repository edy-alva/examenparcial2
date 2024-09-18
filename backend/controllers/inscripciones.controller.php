<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];

if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de INSCRIPCIONES
require_once('../models/inscripciones.model.php');
//error_reporting(0);
$inscripciones = new Inscripciones;

switch ($_GET["op"]) {
        //TODO: operaciones de inscripciones

    case 'todos': //TODO: Procedimiento para cargar todos los datos
        $datos = array(); 
        $datos = $inscripciones->todos(); 
        $todos = null;
        while ($row = mysqli_fetch_assoc($datos))
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'uno': 
        $Inscripciones_id = $_POST["Inscripciones_id"];
        $datos = array();
        $datos = $inscripciones->uno($Inscripciones_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        
    case 'insertar':  
        $Estado = $_POST["Estado"];

        $Talleres_talleres_id = $_POST["Talleres_talleres_id"];
        $Participantes_participantes_id = $_POST["Participantes_participantes_id"];
        $datos = array();
        $datos = $inscripciones->insertar($Estado, $Talleres_talleres_id, $Participantes_participantes_id);
        echo json_encode($datos);
        break;
        
    case 'actualizar':  
        $Inscripciones_id = $_POST["Inscripciones_id"];
        $Estado = $_POST["Estado"];

        $Talleres_talleres_id = $_POST["Talleres_talleres_id"];
        $Participantes_participantes_id = $_POST["Participantes_participantes_id"];
        $datos = array();
        $datos = $inscripciones->actualizar($Inscripciones_id, $Estado, $Talleres_talleres_id, $Participantes_participantes_id);
        echo json_encode($datos);
        break;
        
    case 'eliminar': 
        $Inscripciones_id = $_POST["Inscripciones_id"];
        $datos = array();
        $datos = $inscripciones->eliminar($Inscripciones_id);
        echo json_encode($datos);
        break;
}