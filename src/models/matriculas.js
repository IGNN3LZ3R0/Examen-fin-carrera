import mongoose, { Schema, model } from "mongoose";

const matriculaSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'estudiantes',
        required: true
    },
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'materias',
        required: true
    }
}, {
    timestamps: true
});

export default model("matriculas", matriculaSchema);
