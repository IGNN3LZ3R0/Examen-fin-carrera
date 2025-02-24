import express from 'express';
import {
    CrearMatricula,
    VerMatricula,
    detalleMatricula,
    ActualizarMatricula,
    EliminarMatricula
} from '../controllers/matriculas.js';
import verificarJWT from '../middlewares/verificarJWT.js';

const router = express.Router();

// Ruta de bienvenida
router.get('/matriculas/welcome', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});

// Rutas CRUD para matrículas
router.post('/matriculas', verificarJWT, CrearMatricula);
router.get('/matriculas', verificarJWT, VerMatricula); // Obtener todas las matrículas
router.get('/matriculas/:id', verificarJWT, detalleMatricula); // Obtener detalle de una matrícula
router.put('/matriculas/:id', verificarJWT, ActualizarMatricula);
router.delete('/matriculas/:id', verificarJWT, EliminarMatricula);

export default router;
