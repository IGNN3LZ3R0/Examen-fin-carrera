import Usuario from "../models/usuario.js";
import crearJWT from "../helpers/crearJWT.js"; // Asegúrate de que el nombre sea correcto
import mongoose from "mongoose";


const registro = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    // Validaciones y demás
    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    const caracteres = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!caracteres.test(nombre) || !caracteres.test(apellido)) {
        return res.status(400).json({ msg: "El nombre y apellido solo pueden contener letras y espacios" });
    }
    try {
        // Comprobación de que el email ya está registrado
        const verificarEmailBDD = await Usuario.findOne({ email });
        if (verificarEmailBDD) {
            return res.status(400).json({ msg: "El email ya se encuentra registrado, intente con uno diferente" });
        }
        // Creación del nuevo usuario
        const nuevoUsuario = new Usuario({ nombre, apellido, email, password });
        await nuevoUsuario.save();
        // Generamos el JWT
        const token = crearJWT(nuevoUsuario._id, nuevoUsuario.rol); // Asegúrate de pasar el rol si es necesario
        res.status(201).json({
            msg: "Usuario registrado correctamente",
            token
        });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
// Controladores de la parte del login
const login = async (req, res) => {
    const { email, password } = req.body;
    // Validaciones del login
    if (!email || !password) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    try {
        const usuarioBDD = await Usuario.findOne({ email });
        if (!usuarioBDD) {
            return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });
        }
        if (password !== usuarioBDD.password) {
            return res.status(401).json({ msg: "Lo sentimos, el password no es el correcto" });
        }
        // Generamos el JWT
        const token = crearJWT(usuarioBDD._id, usuarioBDD.rol); // Asegúrate de pasar el rol si es necesario
        res.status(200).json({
            nombre: usuarioBDD.nombre,
            apellido: usuarioBDD.apellido,
            _id: usuarioBDD._id,
            email: usuarioBDD.email,
            token
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
export { registro, login };