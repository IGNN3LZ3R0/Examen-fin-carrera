import mongoose from "mongoose"; // Corrige el nombre de la importación
mongoose.set("strictQuery", true);
const connection = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Opcional pero recomendado
            useUnifiedTopology: true // Opcional pero recomendado
        });
        console.log(`La base de datos esta conectada en ${connection.host} - ${connection.port}`);
    } catch (error) {
        console.log("Error el conexion con la base de datos", error);
    }
};
export default connection;