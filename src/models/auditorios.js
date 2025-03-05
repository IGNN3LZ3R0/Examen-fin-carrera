import mongoose, { Schema, model } from "mongoose";
const auditoriosSchema = new Schema({
    cedula: {
        type: String,
        required: true, 
        trim: true,
        maxlength: 10 
    },
    nombre: {
        type: String,
        required: true,
        maxlength: 50
    },
    ubicacion: {
        type: String,
        required: true,
        maxlength: 100 
    },
    capacidad: {
        type: Number, 
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 50 
    }
}, {
    timestamps: true
});
export default model("auditorios", auditoriosSchema);