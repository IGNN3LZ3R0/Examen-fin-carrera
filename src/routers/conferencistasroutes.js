import express from 'express';
import {
    CrearConferencista,
    VerConferencistas,
    ActualizarConferencista,
    EliminarConferencista,
    DetalleConferencista,
}from '../controllers/conferencistascontroller.js'; // Asegúrate de que el nombre del archivo sea correcto
import verificarJWT from '../middlewares/verificarJWT.js';
const router = express.Router();
// Ruta para la bienvenida
// Ruta de bienvenida
router.get('/matriculas/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});
// Rutas CRUD para estudiantes
router.post('/estudiantes/crear', verificarJWT, CrearConferencista); // Crear un nuevo conferencista
router.get('/estudiantes/ver', verificarJWT, VerConferencistas); // Obtener todos los conferencistas
router.get('/estudiantes/ver/:id', verificarJWT, DetalleConferencista); // Obtener detalle de un confencistas
router.put('/estudiantes/actualizar/:id', verificarJWT, ActualizarConferencista,); // Actualizar información de un conferencista
router.delete('/estudiantes/eliminar/:id', verificarJWT, EliminarConferencista,); // Eliminar un conferencista
export default router;