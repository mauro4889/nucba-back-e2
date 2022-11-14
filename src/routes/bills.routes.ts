import { Router } from "express";
import { BillsController } from "../controllers/bills.contronller";


const router = Router()

router.post('/', BillsController.create)
router.get('/', BillsController.getAll)
router.get('/:id', BillsController.getid)
router.patch('/:id', BillsController.update)
router.delete('/:id', BillsController.delete)

export default router