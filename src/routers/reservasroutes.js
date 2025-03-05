import express from 'express';
import {    
    crearReserva,
    verReservas,
    detalleReserva,
    actualizarReserva,
    eliminarReserva
} from '../controllers/reservascontroller.js';
import verificarJWT from '../middlewares/verificarJWT.js';

const router = express.Router();

// Ruta de bienvenida
router.get('/matriculas/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});


// Rutas CRUD para matrículas
router.post('/matriculas/crear', verificarJWT,crearReserva);
router.get('/matriculas/ver', verificarJWT, verReservas); // Obtener todas las matrículas
router.get('/matriculas/ver/:id', verificarJWT, detalleReserva); // Obtener detalle de una matrícula
router.put('/matriculas/actualizar/:id', verificarJWT, actualizarReserva);
router.delete('/matriculas/eliminar/:id', verificarJWT, eliminarReserva);

export default router;
