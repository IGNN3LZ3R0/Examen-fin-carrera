import mongoose, { Schema, model } from "mongoose";
import matriculaModel from './matricula.js';

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 50
    },
    codigo: {
        type: String,
        required: true,
        maxlength: 10
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 50
    },
    creditos: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


materiaSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await matriculaModel.deleteMany({ materia: this._id });
    next();
});

export default model("materias", materiaSchema);
