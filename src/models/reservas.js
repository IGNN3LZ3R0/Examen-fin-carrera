import mongoose, { Schema, model } from "mongoose";
const reservasSchema = new Schema({
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
    conferencista: {
        type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referencia
        ref: 'conferencistas', // Cambiado a 'conferencistas' para que coincida con el modelo correcto
        required: true
    },
    auditorio: [{
        type: mongoose.Schema.Types.ObjectId, // Usar ObjectId para referencia
        ref: 'auditorios', // Cambiado a 'auditorios' para que coincida con el modelo correcto
        required: true
    }]
}, {
    timestamps: true
});
export default model("reservas", reservasSchema);