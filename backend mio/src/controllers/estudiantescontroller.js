import mongoose from "mongoose";
import estudiantes from "../models/estudiantes.js";
import Usuario from "../models/usuario.js";

const CrearEstudiante = async (req, res) => {
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;
    
    // Validaciones
    if (Object.values(req.body).includes("")) 
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    
    const EmailUsuario = await Usuario.findOne({ email });
    if (EmailUsuario) 
        return res.status(400).json({ msg: "Lo sentimos, el email parece que ha sido registrado en una cuenta de usuario" });
    
    const VerificarEmail = await estudiantes.findOne({ email });
    if (VerificarEmail) 
        return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    
    const Verificacion_numeros = /^[0-9]+$/;
    if (!Verificacion_numeros.test(cedula)) 
        return res.status(400).json({ msg: "Asegúrese de ingresar solo números en la cédula" });
    if (!Verificacion_numeros.test(telefono)) 
        return res.status(400).json({ msg: "Asegúrese de ingresar solo números en el teléfono" });
    
    const VerificarCedula = await estudiantes.findOne({ cedula });
    if (VerificarCedula) 
        return res.status(400).json({ msg: "Lo sentimos, la cédula ya se encuentra registrada" });
    
    const VerificarTelefono = await estudiantes.findOne({ telefono });
    if (VerificarTelefono) 
        return res.status(400).json({ msg: "Lo sentimos, el teléfono ya se encuentra registrado" });
    
    // BDD
    const nuevoEstudiante = new estudiantes(req.body);
    await nuevoEstudiante.save();
    
    // Respuesta
    res.status(200).json({ msg: "El estudiante fue registrado exitosamente" });
};

const VerEstudiante = async (req, res) => {
    try {
        const listaEstudiantes = await estudiantes.find().select("-createdAt -updatedAt -__v");
        res.json(listaEstudiantes);
    } catch (error) {
        res.status(500).json({ msg: "Hubo un error al mostrar los estudiantes", error });
    }
};

const detalleEstudiante = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ msg: "Lo sentimos, no se encuentra registrado el estudiante" });
    
    const estudiante = await estudiantes.findById(id).select("-createdAt -updatedAt -__v");
    res.status(200).json(estudiante);
};

const ActualizarEstudiante = async (req, res) => {
    const { id } = req.params;
    
    // Validaciones
    if (Object.values(req.body).includes("")) 
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ msg: "No se ha encontrado a un estudiante con ese id" });
    
    // BDD
    await estudiantes.findByIdAndUpdate(id, req.body);
    
    // Respuesta
    res.status(200).json({ msg: "Se ha actualizado la información del estudiante" });
};

const EliminarEstudiante = async (req, res) => {
    const { id } = req.params;
    
    // Validaciones
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ msg: "Lo sentimos, no se ha encontrado al estudiante" });
    
    // BDD
    await estudiantes.findByIdAndDelete(id);
    
    // Respuesta
    res.status(200).json({ msg: "El registro del estudiante ha sido eliminado exitosamente" });
};


export {
    CrearEstudiante,
    VerEstudiante,
    ActualizarEstudiante,
    EliminarEstudiante,
    detalleEstudiante,
};
