import mongoose, { Schema, model } from "mongoose";
const matriculasSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        maxlength: 20
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 50
    },
    creditos: {
        type: Number,
        required: true
    },
    estudiante: {
        type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referencia
        ref: 'estudiantes', // Nombre del modelo al que se refiere
        required: true
    },
    materia: [{
        type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referencia
        ref: 'materias', // Nombre del modelo al que se refiere
        required: true
    }]
}, {
    timestamps: true
});
export default model("matriculas", matriculasSchema);