import { Router } from "express";
import {
    login,
    registro,
} from "../controllers/usuariocontroller.js";

const router = Router()

router.post('/usuarios/login',login)//OK
router.post('/usuarios/registro',registro) //OK


export default router