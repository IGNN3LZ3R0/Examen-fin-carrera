import express from 'express';
import {
    crearMateria,
    obtenerMaterias,
    detalleMateria,
    actualizarMateria,
    eliminarMateria
} from '../controllers/materiascontoller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
const router = express.Router();
// Ruta para la bienvenida
// Ruta de bienvenida
router.get('/matriculas/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});
// Rutas CRUD para materias
router.post('/materias/crear', verificarJWT, crearMateria);
router.get('/materias/ver', verificarJWT, obtenerMaterias); // Obtener todas las materias
router.get('/materias/ver/:id', verificarJWT, detalleMateria); // Obtener detalle de una materia
router.put('/materias/actualizar/:id', verificarJWT, actualizarMateria);
router.delete('/materias/eliminar/:id', verificarJWT, eliminarMateria);
export default router;