import matriculas from "../models/matriculas.js";
import estudiantes from "../models/estudiantes.js";
import materias from "../models/materias.js";
import mongoose from "mongoose";


const crearMatricula = async (req, res) => {
    try {
        const { codigo, descripcion, creditos, id_estudiante, id_materias } = req.body;
        // Validaciones
        if (!codigo || !descripcion || !creditos || !id_estudiante || !id_materias) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios." });
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
        const matriculasList = await matriculas.find().select("-createdAt -updatedAt -__v");
        res.json(matriculasList);
    } catch (error) {
        console.error("Error al obtener las matrículas:", error); // Imprimir el error para depuración
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};


const detalleMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ msg: "Matrícula no encontrada" });
        
        res.status(200).json(await matriculas.findById(id).select("-createdAt -updatedAt -__v"));
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
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
