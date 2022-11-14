import { Router } from "express";
import { UserController } from "../controllers/user.controller";


const router = Router()

router.post('/', UserController.create)
router.get('/', UserController.get)
router.get('/:ID', UserController.getID)
router.patch('/:ID', UserController.update)
router.delete('/:ID', UserController.delete)

export default router