import Matriculas from "../models/matriculas.js";
import Estudiantes from "../models/estudiantes.js";
import Materias from "../models/materias.js";
import mongoose from "mongoose";

const CrearMatricula = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/"); // Verificación de sesión
        
        const { codigo, descripcion, creditos, id_estudiante, id_materias } = req.body;

        if (Object.values(req.body).includes("")) 
            return res.status(400).json({ msg: "Debes llenar todos los campos obligatorios" });

        const verificarCodigo = await Matriculas.findOne({ codigo });
        if (verificarCodigo) 
            return res.status(400).json({ msg: "El código ingresado ya está en uso" });

        const permitidoCodigo = /^[A-Z0-9]+$/;
        if (!permitidoCodigo.test(codigo)) 
            return res.status(400).json({ msg: "El código solo puede contener mayúsculas y números" });

        const estudiante = await Estudiantes.findById(id_estudiante);
        if (!estudiante) 
            return res.status(400).json({ msg: "No se encontró al estudiante" });

        const materias = await Materias.find({ _id: { $in: id_materias } });
        if (materias.length !== id_materias.length) 
            return res.status(400).json({ msg: "Algunas materias no fueron encontradas" });

        const nuevaMatricula = new Matriculas({
            codigo,
            descripcion,
            creditos,
            estudiante,
            materia: materias
        });

        await nuevaMatricula.save();
        res.status(200).json({ msg: "Matrícula creada con éxito" });
    } catch (error) {
        console.error("Error al crear la matrícula:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const VerMatricula = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/");
        res.json(await Matriculas.find().select("-createdAt -updatedAt -__v"));
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};

const detalleMatricula = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/");
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).json({ msg: "Matrícula no encontrada" });
        
        res.status(200).json(await Matriculas.findById(id).select("-createdAt -updatedAt -__v"));
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};

const ActualizarMatricula = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/");
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ msg: "Matrícula no encontrada" });

        await Matriculas.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Matrícula actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};

const EliminarMatricula = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/");
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({ msg: "Matrícula no encontrada" });
        
        await Matriculas.findByIdAndDelete(id);
        res.status(200).json({ msg: "Matrícula eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error", error });
    }
};

export { CrearMatricula, VerMatricula, ActualizarMatricula, EliminarMatricula, detalleMatricula };
