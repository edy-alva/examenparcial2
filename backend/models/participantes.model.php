<?php
//TODO: Clase de Participantes
require_once('../config/config.php');
class Participantes
{
    //TODO: Implementar los metodos de la clase
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `participantes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($Participantes_id) 
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `participantes` WHERE `participantes_id`=$Participantes_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Nombre, $Apellido, $Email, $Telefono) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `participantes`(`nombre`,`apellido`,`email`,`telefono`) 
            VALUES ('$Nombre', '$Apellido', '$Email', '$Telefono')";  
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
    public function actualizar($Participantes_id, $Nombre, $Apellido, $Email, $Telefono) 
    {
        try {
            $con = new ClaseConectar($Participantes_id);
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `participantes` 
            SET `nombre`='$Nombre',`apellido`='$Apellido',`email`='$Email',`telefono`='$Telefono'
            WHERE `participantes_id` = $Participantes_id";
            if (mysqli_query($con, $cadena)) {
                return $Participantes_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($Participantes_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `participantes` WHERE `participantes_id`= $Participantes_id";
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