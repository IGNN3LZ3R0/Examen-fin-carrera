// Requerir los módulos
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routerusuario from "./routers/usuarioroutes.js";
import routerauditorios from "./routers/auditoriosroutes.js";
import routerconferencistas from './routers/conferencistasroutes.js'; 
import routerreservas from './routers/reservasroutes.js';
// Inicializaciones
const app = express();
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
// Configuraciones 
app.set('port', process.env.PORT || 3000); // Cambiado 'port' a 'PORT' para seguir la convención de mayúsculas
// Configuración específica de CORS
const corsOptions = {
    origin: 'https://frontend-plantilla-1.onrender.com', // Reemplaza con el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};
app.use(cors(corsOptions));
// Middlewares 
app.use(express.json());
// Rutas 
app.get('/', (req, res) => {
    res.send("Server on");
});
// Agrupar las rutas bajo el mismo prefijo
app.use("/caso5", routerusuario);
app.use("/caso5", routerauditorios);
app.use("/caso5", routerconferencistas);
app.use("/caso5", routerreservas); // Cambiado 'matriculas' a 'reservas'
// Exportar la instancia de express por medio de app
export default app;