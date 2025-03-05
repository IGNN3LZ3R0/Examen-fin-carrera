import mongoose from "mongoose";
import conferencistas from "../models/conferencistas.js"; // Cambiado a conferencistas
import Usuario from "../models/usuario.js";
const CrearConferencista = async (req, res) => {
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email, genero, empresa } = req.body;
    
    // Validaciones
    if (Object.values(req.body).includes("")) 
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    const EmailUsuario = await Usuario.findOne({ email });
    if (EmailUsuario) 
        return res.status(400).json({ msg: "Lo sentimos, el email parece que ha sido registrado en una cuenta de usuario" });
    
    const VerificarEmail = await conferencistas.findOne({ email });
    if (VerificarEmail) 
        return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    
    const Verificacion_numeros = /^[0-9]+$/;
    if (!Verificacion_numeros.test(cedula)) 
        return res.status(400).json({ msg: "Asegúrese de ingresar solo números en la cédula" });
    if (!Verificacion_numeros.test(telefono)) 
        return res.status(400).json({ msg: "Asegúrese de ingresar solo números en el teléfono" });
    
    const VerificarCedula = await conferencistas.findOne({ cedula });
    if (VerificarCedula) 
        return res.status(400).json({ msg: "Lo sentimos, la cédula ya se encuentra registrada" });
    
    const VerificarTelefono = await conferencistas.findOne({ telefono });
    if (VerificarTelefono) 
        return res.status(400).json({ msg: "Lo sentimos, el teléfono ya se encuentra registrado" });
    
    // BDD
    const nuevoConferencista = new conferencistas(req.body);
    await nuevoConferencista.save();
    
    // Respuesta
    res.status(200).json({ msg: "El conferencista fue registrado exitosamente" });
};
const VerConferencistas = async (req, res) => {
    try {
        const listaConferencistas = await conferencistas.find().select("-createdAt -updatedAt -__v");
        
        // Formatear la fecha antes de enviarla al frontend
        const conferencistasFormateados = listaConferencistas.map(conferencista => ({
            ...conferencista.toObject(),
            fecha_nacimiento: conferencista.fecha_nacimiento 
                ? new Date(conferencista.fecha_nacimiento).toISOString().split('T')[0] 
                : null
        }));
        
        res.json(conferencistasFormateados);
    } catch (error) {
        res.status(500).json({ msg: "Hubo un error al mostrar los conferencistas", error });
    }
};
const DetalleConferencista = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ msg: "Lo sentimos, no se encuentra registrado el conferencista" });
    
    const conferencista = await conferencistas.findById(id).select("-createdAt -updatedAt -__v");
    res.status(200).json(conferencista);
};
const ActualizarConferencista = async (req, res) => {
    const { id } = req.params;
    
    // Validaciones
    if (Object.values(req.body).includes("")) 
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(400).json({ msg: "No se ha encontrado a un conferencista con ese id" });
    
    // BDD
    await conferencistas.findByIdAndUpdate(id, req.body);
    
    // Respuesta
    res.status(200).json({ msg: "Se ha actualizado la información del conferencista" });
};
const EliminarConferencista = async (req, res) => {
    const { id } = req.params;
    
    // Validaciones
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ msg: "Lo sentimos, no se ha encontrado al conferencista" });
    
    // BDD
    await conferencistas.findByIdAndDelete(id);
    
    // Respuesta
    res.status(200).json({ msg: "El registro del conferencista ha sido eliminado exitosamente" });
};
export {
    CrearConferencista,
    VerConferencistas,
    ActualizarConferencista,
    EliminarConferencista,
    DetalleConferencista,
};