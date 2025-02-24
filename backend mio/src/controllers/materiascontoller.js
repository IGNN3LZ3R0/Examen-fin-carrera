import { mongoose } from "mongoose";
import Materias from "../models/materias.js";

// Mensaje de bienvenida
const bienvenida = (req, res) => {
    res.send(`Bienvenido - ${req.user?.nombre || "Usuario"}`);
};

// Crear una nueva materia
const crearMateria = async (req, res) => {
    try {
        const { nombre, codigo, descripcion, creditos } = req.body;
        const nombreMin = nombre.toLowerCase();
        // Verifica que todos los campos sean cadenas y no estén vacíos
        if (Object.values(req.body).some(value => 
            value === null || 
            value === undefined || 
            (typeof value === 'string' && value.trim() === "")
        )) {
            return res.status(400).json({ msg: "Debe llenar todos los campos" });
        }
        const nombreExiste = await Materias.findOne({ nombre: nombreMin });
        if (nombreExiste) return res.status(400).json({ msg: "Ya existe una materia con ese nombre" });
        const codigoExiste = await Materias.findOne({ codigo });
        if (codigoExiste) return res.status(400).json({ msg: "Ya existe una materia con ese código" });
        const permitidoNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!permitidoNombre.test(nombre)) {
            return res.status(400).json({ msg: "No se permiten caracteres especiales en el nombre" });
        }
        const permitidoCodigo = /^[A-Z0-9]+$/;
        if (!permitidoCodigo.test(codigo)) {
            return res.status(400).json({ msg: "El código debe contener solo letras mayúsculas y números" });
        }
        const nuevaMateria = new Materias({ nombre: nombreMin, codigo, descripcion, creditos });
        await nuevaMateria.save();
        res.status(201).json({ msg: "Materia creada exitosamente", materia: nuevaMateria });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las materias
const obtenerMaterias = async (req, res) => {
    try {
        const materias = await Materias.find().select("-createdAt -updatedAt -__v");
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las materias", error: error.message });
    }
};

// Obtener detalle de una materia
const detalleMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "No se encontró la materia" });
        }
        const materia = await Materias.findById(id).select("-createdAt -updatedAt -__v");
        if (!materia) return res.status(404).json({ msg: "Materia no encontrada" });
        res.status(200).json(materia);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener la materia", error: error.message });
    }
};

// Actualizar una materia
const actualizarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Materia no encontrada" });
        }
        const materiaActualizada = await Materias.findByIdAndUpdate(id, req.body, { new: true });
        if (!materiaActualizada) return res.status(404).json({ msg: "Materia no encontrada" });
        res.status(200).json({ msg: "Materia actualizada exitosamente", materia: materiaActualizada });
    } catch (error) {
        res.status(400).json({ msg: "Error al actualizar la materia", error: error.message });
    }
};

// Eliminar una materia
const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Materia no encontrada" });
        }
        const materiaEliminada = await Materias.findByIdAndDelete(id);
        if (!materiaEliminada) return res.status(404).json({ msg: "Materia no encontrada" });
        res.status(200).json({ msg: "Materia eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la materia", error: error.message });
    }
};

export {
    bienvenida,
    crearMateria,
    obtenerMaterias,
    detalleMateria,
    actualizarMateria,
    eliminarMateria
};