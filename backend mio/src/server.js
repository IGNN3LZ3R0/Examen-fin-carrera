// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerusuario from "./routers/usuarioroutes.js"
import routermateria from "./routers/materiasroutes.js"
import routerestudiantes from './routers/estudiantesroutes.js';
import routermatriculas from './routers/matriculasroutes.js'

// Inicializaciones
const app = express();
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use("/caso1", routerusuario)
app.use("/caso1", routermateria)
app.use("/caso1", routerestudiantes)
app.use("/caso1", routermatriculas)



// Exportar la instancia de express por medio de app
export default  app