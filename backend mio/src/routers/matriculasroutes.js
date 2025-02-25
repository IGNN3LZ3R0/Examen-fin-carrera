import express from 'express';
import { crearMatricula, verMatricula, actualizarMatricula, eliminarMatricula, detalleMatricula } from '../controllers/matriculascontroller.js';
import verificarJWT from '../middlewares/verificarJWT.js';

const router = express.Router();

// Ruta de bienvenida
router.get('/matriculas/welcome', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});


// Rutas CRUD para matrículas
router.post('/matriculas', verificarJWT, crearMatricula);
router.get('/matriculas', verificarJWT, verMatricula); // Obtener todas las matrículas
router.get('/matriculas/:id', verificarJWT, detalleMatricula); // Obtener detalle de una matrícula
router.put('/matriculas/:id', verificarJWT, actualizarMatricula);
router.delete('/matriculas/:id', verificarJWT, eliminarMatricula);

export default router;
