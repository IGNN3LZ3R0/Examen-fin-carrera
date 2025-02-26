import express from 'express';
import { crearMatricula, verMatricula, actualizarMatricula, eliminarMatricula, detalleMatricula } from '../controllers/matriculascontroller.js';
import verificarJWT from '../middlewares/verificarJWT.js';

const router = express.Router();

// Ruta de bienvenida
router.get('/matriculas/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});


// Rutas CRUD para matrículas
router.post('/matriculas/crear', verificarJWT, crearMatricula);
router.get('/matriculas/ver', verificarJWT, verMatricula); // Obtener todas las matrículas
router.get('/matriculas/ver/:id', verificarJWT, detalleMatricula); // Obtener detalle de una matrícula
router.put('/matriculas/actualizar/:id', verificarJWT, actualizarMatricula);
router.delete('/matriculas/eliminar/:id', verificarJWT, eliminarMatricula);

export default router;
