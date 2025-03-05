import express from 'express';
import {
    crearAuditorio,
    obtenerAuditorios,
    detalleAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
} from '../controllers/auditorioscontoller.js';
import verificarJWT from '../middlewares/verificarJWT.js';
const router = express.Router();
// Ruta de bienvenida
router.get('/auditorio/bienvenido', verificarJWT, (req, res) => {
    res.json({ msg: `Bienvenido - ${req.user.nombre}` });
});
// Rutas CRUD para auditorios
router.post('/auditorio/crear', verificarJWT, crearAuditorio);
router.get('/auditorio/ver', verificarJWT, obtenerAuditorios); // Obtener todos los auditorios
router.get('/auditorio/ver/:id', verificarJWT, detalleAuditorio); // Obtener detalle de un auditorio
router.put('/auditorio/actualizar/:id', verificarJWT, actualizarAuditorio);
router.delete('/auditorio/eliminar/:id', verificarJWT, eliminarAuditorio);
export default router;