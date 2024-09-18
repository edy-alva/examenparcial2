<?php
//TODO: Clase de Talleres
require_once('../config/config.php');
class Talleres
{
    //TODO: Implementar los metodos de la clase
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `talleres`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($Talleres_id) 
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `talleres` WHERE `talleres_id`=$Talleres_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Nombre, $Descripcion, $Fecha, $Ubicacion) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `talleres`(`nombre`,`descripcion`,`fecha`,`ubicacion`) 
            VALUES ('$Nombre', '$Descripcion', '$Fecha', '$Ubicacion')";  
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
    public function actualizar($Talleres_id, $Nombre, $Descripcion, $Fecha, $Ubicacion) 
    {
        try {
            $con = new ClaseConectar($Talleres_id);
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `talleres` 
            SET `nombre`='$Nombre',`descripcion`='$Descripcion',`fecha`='$Fecha',`ubicacion`='$Ubicacion'
            WHERE `talleres_id` = $Talleres_id";
            if (mysqli_query($con, $cadena)) {
                return $Talleres_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($Talleres_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `talleres` WHERE `talleres_id`= $Talleres_id";
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