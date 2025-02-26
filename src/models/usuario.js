import {Schema, model} from 'mongoose'

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
				unique:true
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type: String,
        require: null
    }
}, {
    timestamps:true
})

// metodo para ver si la contraseña esta en la base de datos y coinciden
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password, this.password)
    return response
}

// metodo para crear el token por si acaso
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Usuario', usuarioSchema)