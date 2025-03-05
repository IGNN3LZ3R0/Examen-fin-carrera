import mongoose, { Schema, model } from 'mongoose';
const conferencistasSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10 
    },
    genero: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20 
    },
    ciudad: {
        type: String,
        required: true,
        maxlength: 50 
    },
    direccion: {
        type: String,
        required: true,
        maxlength: 100 
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        maxlength: 10 
    },
    email: {
        type: String,
        required: true,
        maxlength: 50 
    },
    empresa: {
        type: String,
        required: true, 
        maxlength: 80 
    }
}, {
    timestamps: true
});
export default model('conferencistas', conferencistasSchema);