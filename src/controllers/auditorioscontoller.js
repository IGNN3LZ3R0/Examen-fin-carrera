import { mongoose } from "mongoose";
import auditorios from "../models/auditorios.js"; // Cambiado a auditorios
// Crear un nuevo auditorio
const crearAuditorio = async (req, res) => {
    try {
        const { cedula, nombre, ubicacion, capacidad, descripcion } = req.body;
        // Verifica que todos los campos sean válidos
        if (Object.values(req.body).some(value => 
            value === null || 
            value === undefined || 
            (typeof value === 'string' && value.trim() === "")
        )) {
            return res.status(400).json({ msg: "Debe llenar todos los campos" });
        }
        const nombreExiste = await auditorios.findOne({ nombre });
        if (nombreExiste) return res.status(400).json({ msg: "Ya existe un auditorio con ese nombre" });
        const cedulaExiste = await auditorios.findOne({ cedula });
        if (cedulaExiste) return res.status(400).json({ msg: "Ya existe un auditorio con esa cédula" });
        const permitidoNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!permitidoNombre.test(nombre)) {
            return res.status(400).json({ msg: "No se permiten caracteres especiales en el nombre" });
        }
        const permitidoUbicacion = /^[a-zA-Z0-9\s]+$/; // Ajuste para permitir letras y números
        if (!permitidoUbicacion.test(ubicacion)) {
            return res.status(400).json({ msg: "La ubicación debe contener solo letras y números" });
        }
        if (typeof capacidad !== 'number' || capacidad <= 0) {
            return res.status(400).json({ msg: "La capacidad debe ser un número positivo" });
        }
        const nuevoAuditorio = new auditorios({ cedula, nombre, ubicacion, capacidad, descripcion });
        await nuevoAuditorio.save();
        res.status(201).json({ msg: "Auditorio creado exitosamente", auditorio: nuevoAuditorio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Obtener todos los auditorios
const obtenerAuditorios = async (req, res) => {
    try {
        const auditoriosList = await auditorios.find().select("-createdAt -updatedAt -__v");
        res.status(200).json(auditoriosList);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los auditorios", error: error.message });
    }
};
// Obtener detalle de un auditorio
const detalleAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "No se encontró el auditorio" });
        }
        const auditorio = await auditorios.findById(id).select("-createdAt -updatedAt -__v");
        if (!auditorio) return res.status(404).json({ msg: "Auditorio no encontrado" });
        res.status(200).json(auditorio);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el auditorio", error: error.message });
    }
};
// Actualizar un auditorio
const actualizarAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Auditorio no encontrado" });
        }
        const auditorioActualizado = await auditorios.findByIdAndUpdate(id, req.body, { new: true });
        if (!auditorioActualizado) return res.status(404).json({ msg: "Auditorio no encontrado" });
        res.status(200).json({ msg: "Auditorio actualizado exitosamente", auditorio: auditorioActualizado });
    } catch (error) {
        res.status(400).json({ msg: "Error al actualizar el auditorio", error: error.message });
    }
};
// Eliminar un auditorio
const eliminarAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Auditorio no encontrado" });
        }
        const auditorioEliminado = await auditorios.findByIdAndDelete(id);
        if (!auditorioEliminado) return res.status(404).json({ msg: "Auditorio no encontrado" });
        res.status(200).json({ msg: "Auditorio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar el auditorio", error: error.message });
    }
};
export {
    crearAuditorio,
    obtenerAuditorios,
    detalleAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
};