
import mongoose, {Schema,model} from 'mongoose'
const estudianteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true,
        maxlength : 25
    },
    apellido:{
        type:String,
        require:true,
        trim:true,
        maxlength : 25
    },
    cedula:{
        type:String,
        require:true,
        trim:true,
        maxlenght:10
    },
    fecha_nacimiento:{
        type:Date,
        require:true,
        maxlenght:50
    },
    ciudad:{
        type:String,
        require:true,
        maxlenght:25,
    },
    direccion:{
        type:String,
        require:true,
        maxlenght:50
    },
    telefono:{
        type:String,
        require:true,
        maxlenght:10
    },
    email:{
        type:String,
        require:true,
        maxlenght:30
    }
},{
    timestamps:true
})


export default model('estudiantes',estudianteSchema)
