import mongoose, {Schema, model} from "mongoose";

const matriculasSchema = new Schema({
    codigo:{
        type:String,
        require:true,
        maxlength:20
    },
    descripcion:{
        type:String,
        require:true,
        maxlength:50
    },

    creditos: {
        type: Number,
        require: true
    },

    estudiante: {
        type: Object,
        required: true },
        
    materia: {
        type: [Object],
        required: true },
},{
    timestamps:true
})

export default model("matriculas", matriculasSchema)