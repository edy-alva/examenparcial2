<?php
//TODO: Clase de Inscripciones
require_once('../config/config.php');
class Inscripciones
{
    //TODO: Implementar los metodos de la clase
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($Inscripciones_id) 
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `inscripciones` WHERE `inscripciones_id`=$Inscripciones_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Estado, $Fecha, $Talleres_talleres_id, $Participantes_participantes_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `inscripciones`(`estado`,`fecha`,`talleres_talleres_id`,`participantes_participantes_id`) 
            VALUES ('$Estado', '$Fecha', '$Talleres_talleres_id', '$Participantes_participantes_id')";  
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($Inscripciones_id, $Estado, $Fecha, $Talleres_talleres_id, $Participantes_participantes_id) 
    {
        try {
            $con = new ClaseConectar($Inscripciones_id);
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `inscripciones` 
            SET `estado`='$Estado',`fecha`='$Fecha',`talleres_talleres_id`='$Talleres_talleres_id',`participantes_participantes_id`='$Participantes_participantes_id'
            WHERE `inscripciones_id` = $Inscripciones_id";
            if (mysqli_query($con, $cadena)) {
                return $Inscripciones_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($Inscripciones_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `inscripciones` WHERE `inscripciones_id`= $Inscripciones_id";
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}