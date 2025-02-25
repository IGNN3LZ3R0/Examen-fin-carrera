import express from 'express';
import {
    CrearEstudiante,
    VerEstudiante,
    ActualizarEstudiante,
    EliminarEstudiante,
    detalleEstudiante,
}from '../controllers/estudiantescontroller.js'; // Asegúrate de que el nombre del archivo sea correcto
import verificarJWT from '../middlewares/verificarJWT.js';
const router = express.Router();
// Ruta para la bienvenida
// Ruta de bienvenida
router.get('/matriculas/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});
// Rutas CRUD para estudiantes
router.post('/estudiantes/crear', verificarJWT, CrearEstudiante); // Crear un nuevo estudiante
router.get('/estudiantes/ver', verificarJWT, VerEstudiante); // Obtener todos los estudiantes
router.get('/estudiantes/ver/:id', verificarJWT, detalleEstudiante); // Obtener detalle de un estudiante
router.put('/estudiantes/actualizar/:id', verificarJWT, ActualizarEstudiante); // Actualizar información de un estudiante
router.delete('/estudiantes/eliminar/:id', verificarJWT, EliminarEstudiante); // Eliminar un estudiante
export default router;