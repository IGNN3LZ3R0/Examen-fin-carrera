// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerusuario from "./routers/usuarioroutes.js"
import routermateria from "./routers/materiasroutes.js"
import routerconferencitas from './routers/conferencistasroutes.js';
import routermatriculas from './routers/matriculasroutes.js'

// Inicializaciones
const app = express();
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Configuraciones 
app.set('port',process.env.port || 3000)
// Configuración específica de CORS
const corsOptions = {
    origin: 'https://frontend-plantilla-1.onrender.com', // Reemplaza con el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  };
  app.use(cors(corsOptions))

// Middlewares 
app.use(express.json())

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use("/caso5", routerusuario)
app.use("/caso5", routermateria)
app.use("/caso5", routerconferencitas )
app.use("/caso5", routermatriculas)



// Exportar la instancia de express por medio de app
export default  app