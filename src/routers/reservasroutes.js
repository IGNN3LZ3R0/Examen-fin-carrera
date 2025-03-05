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
router.get('/reserva/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});


// Rutas CRUD para matrículas
router.post('/reserva/crear', verificarJWT,crearReserva);
router.get('/reserva/ver', verificarJWT, verReservas); // Obtener todas las matrículas
router.get('/reserva/ver/:id', verificarJWT, detalleReserva); // Obtener detalle de una matrícula
router.put('/reserva/actualizar/:id', verificarJWT, actualizarReserva);
router.delete('/reserva/eliminar/:id', verificarJWT, eliminarReserva);

export default router;
