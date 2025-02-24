import express from 'express';
import {
    bienvenida,
    crearMateria,
    obtenerMaterias,
    detalleMateria,
    actualizarMateria,
    eliminarMateria
} from '../controllers/materiascontoller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
const router = express.Router();
// Ruta para la bienvenida
router.get('/materias/welcome', verificarJWT, bienvenida);
// Rutas CRUD para materias
router.post('/materias', verificarJWT, crearMateria);
router.get('/materias', verificarJWT, obtenerMaterias); // Obtener todas las materias
router.get('/materias/:id', verificarJWT, detalleMateria); // Obtener detalle de una materia
router.put('/materias/:id', verificarJWT, actualizarMateria);
router.delete('/materias/:id', verificarJWT, eliminarMateria);
export default router;