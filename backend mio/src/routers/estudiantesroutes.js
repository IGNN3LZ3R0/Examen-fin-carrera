import express from 'express';
import {
    CrearEstudiante,
    VerEstudiante,
    detalleEstudiante,
    ActualizarEstudiante,
    EliminarEstudiante,
    mostrarBienvenida
} from '../controllers/estudiantescontroller.js'; // Asegúrate de que el nombre del archivo sea correcto
import verificarJWT from '../middlewares/verificarJWT.js';
const router = express.Router();
// Ruta para la bienvenida
router.get('/estudiantes/welcome', verificarJWT, mostrarBienvenida);
// Rutas CRUD para estudiantes
router.post('/estudiantes', verificarJWT, CrearEstudiante); // Crear un nuevo estudiante
router.get('/estudiantes', verificarJWT, VerEstudiante); // Obtener todos los estudiantes
router.get('/estudiantes/:id', verificarJWT, detalleEstudiante); // Obtener detalle de un estudiante
router.put('/estudiantes/:id', verificarJWT, ActualizarEstudiante); // Actualizar información de un estudiante
router.delete('/estudiantes/:id', verificarJWT, EliminarEstudiante); // Eliminar un estudiante
export default router;