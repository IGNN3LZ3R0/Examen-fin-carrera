import { Router } from "express";
import {
    login,
    registro,
} from "../controllers/usuario_controller.js";

const router = Router()

router.post('/usuario/login',login)//OK
router.post('/usuario/registro',registro) //OK


export default router