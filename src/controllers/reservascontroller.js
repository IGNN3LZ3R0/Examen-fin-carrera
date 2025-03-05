import Reservas from "../models/reservas.js";
import Conferencistas from "../models/conferencistas.js";
import Auditorios from "../models/auditorios.js";
import mongoose from "mongoose";
const crearReserva = async (req, res) => {
    try {
        const { codigo, descripcion, id_conferencista, id_auditorios } = req.body;
        // Validaciones de espacios vacíos
        if (Object.values(req.body).some(value => 
            value === null || 
            value === undefined || 
            (typeof value === 'string' && value.trim() === "")
        )) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios y no pueden estar vacíos." });
        }
        // Verificar que el conferencista existe
        const conferencista = await Conferencistas.findById(id_conferencista);
        if (!conferencista) {
            return res.status(400).json({ msg: "Conferencista no encontrado." });
        }
        // Verificar que los auditorios existen
        const auditoriosEncontrados = await Auditorios.find({ _id: { $in: id_auditorios } });
        if (auditoriosEncontrados.length !== id_auditorios.length) {
            return res.status(400).json({ msg: "Algunos auditorios no fueron encontrados." });
        }
        // Crear la nueva reserva
        const nuevaReserva = new Reservas({
            codigo,
            descripcion,
            conferencista: conferencista._id,
            auditorio: auditoriosEncontrados.map(auditorio => auditorio._id)
        });
        await nuevaReserva.save();
        res.status(201).json({ msg: "Reserva creada con éxito.", reserva: nuevaReserva });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};
const verReservas = async (req, res) => {
    try {
        const reservasList = await Reservas
            .find()
            .populate('conferencista', 'nombre apellido cedula') // Muestra solo estos campos del conferencista
            .populate('auditorio', 'nombre ubicacion capacidad') // Muestra solo estos campos del auditorio
            .select("-createdAt -updatedAt -__v"); // Excluir metadatos innecesarios
        res.json(reservasList);
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};
const detalleReserva = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ msg: "Reserva no encontrada" });
        const reserva = await Reservas
            .findById(id)
            .populate('conferencista', 'nombre apellido cedula')
            .populate('auditorio', 'nombre ubicacion capacidad')
            .select("-createdAt -updatedAt -__v");
        if (!reserva) 
            return res.status(404).json({ msg: "Reserva no encontrada" });
        res.status(200).json(reserva);
    } catch (error) {
        console.error("Error al obtener la reserva:", error);
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};
const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ msg: "ID de reserva no válido" });
        // Validar que la reserva existe
        const reservaActualizada = await Reservas.findByIdAndUpdate(id, req.body, { new: true });
        if (!reservaActualizada) return res.status(404).json({ msg: "Reserva no encontrada" });
        res.status(200).json({ msg: "Reserva actualizada con éxito", reserva: reservaActualizada });
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};
const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ msg: "ID de reserva no válido" });
        const reservaEliminada = await Reservas.findByIdAndDelete(id);
        if (!reservaEliminada) return res.status(404).json({ msg: "Reserva no encontrada" });
        res.status(200).json({ msg: "Reserva eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};
export { 
    crearReserva,
    verReservas,
    detalleReserva,
    actualizarReserva,
    eliminarReserva
};