import mongoose, { Schema, model } from 'mongoose';
import matriculaModel from './matricula.js';

const estudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    ciudad: {
        type: String,
        required: true,
        maxlength: 25
    },
    direccion: {
        type: String,
        required: true,
        maxlength: 50
    },
    telefono: {
        type: String,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        maxlength: 30
    }
}, {
    timestamps: true
});


estudianteSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await matriculaModel.deleteMany({ estudiante: this._id });
    next();
});

export default model('estudiantes', estudianteSchema);
