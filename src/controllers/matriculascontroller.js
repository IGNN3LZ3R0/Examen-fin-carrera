import matriculas from "../models/matriculas.js";
import estudiantes from "../models/estudiantes.js";
import materias from "../models/auditorios.js";
import mongoose from "mongoose";


const crearMatricula = async (req, res) => {
    try {
        const { codigo, descripcion, creditos, id_estudiante, id_materias } = req.body;
        
        // Validaciones de espacios vacíos
        if (Object.values(req.body).some(value => 
            value === null || 
            value === undefined || 
            (typeof value === 'string' && value.trim() === "")
        )) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios y no pueden estar vacíos." });
        }
        
        // Verificar que el estudiante existe
        const estudiante = await estudiantes.findById(id_estudiante);
        if (!estudiante) {
            return res.status(400).json({ msg: "Estudiante no encontrado." });
        }
        
        // Verificar que las materias existen
        const materiasEncontradas = await materias.find({ _id: { $in: id_materias } });
        if (materiasEncontradas.length !== id_materias.length) {
            return res.status(400).json({ msg: "Algunas materias no fueron encontradas." });
        }
        
        // Verificar si el estudiante ya está registrado en alguna de las materias
        const matriculasExistentes = await matriculas.find({ 
            estudiante: id_estudiante, 
            materia: { $in: id_materias } 
        });
        
        if (matriculasExistentes.length > 0) {
            return res.status(400).json({ msg: "El estudiante ya está registrado en una o más de las materias seleccionadas." });
        }
        
        // Crear la nueva matrícula
        const nuevaMatricula = new matriculas({
            codigo,
            descripcion,
            creditos,
            estudiante: estudiante._id,
            materia: materiasEncontradas.map(materia => materia._id)
        });
        
        await nuevaMatricula.save();
        res.status(200).json({ msg: "Matrícula creada con éxito." });
    } catch (error) {
        console.error("Error al crear la matrícula:", error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

const verMatricula = async (req, res) => {
    try {
        const matriculasList = await matriculas
            .find()
            .populate('estudiante', 'nombre apellido cedula') // Muestra solo estos campos del estudiante
            .populate('materia', 'nombre codigo creditos') // Muestra solo estos campos de la materia
            .select("-createdAt -updatedAt -__v"); // Excluir metadatos innecesarios

        res.json(matriculasList);
    } catch (error) {
        console.error("Error al obtener las matrículas:", error);
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};


const detalleMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ msg: "Matrícula no encontrada" });

        const matricula = await matriculas
            .findById(id)
            .populate('estudiante', 'nombre apellido cedula')
            .populate('materia', 'nombre codigo creditos')
            .select("-createdAt -updatedAt -__v");

        if (!matricula) 
            return res.status(404).json({ msg: "Matrícula no encontrada" });

        res.status(200).json(matricula);
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};



const actualizarMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ msg: "Matrícula no encontrada" });

        await matriculas.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Matrícula actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};

const eliminarMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ msg: "Matrícula no encontrada" });
        
        await matriculas.findByIdAndDelete(id);
        res.status(200).json({ msg: "Matrícula eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};

export { crearMatricula, verMatricula, actualizarMatricula, eliminarMatricula, detalleMatricula };
