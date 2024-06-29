import {Router} from 'express'
import { body, validationResult, oneOf } from 'express-validator'
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/updates';

const router = Router();

/*
 Product Routes
*/
router.get("/product", getProducts)
router.get("/product/:id", getOneProduct)
router.put("/product/:id", body('name').isString(), handleInputErrors, updateProduct)
router.post("/product", body('name').isString(), handleInputErrors, createProduct)
router.delete("/product/:id", deleteProduct)


/*
 Update Routes
*/
router.get("/update", getUpdates)
router.get("/update/:id", getOneUpdate)
router.put("/update/:id", 
    body('title').optional(), 
    body('body').optional(), 
    body('status').isIn(["IN_PROGRESS", "SHIPPED" ,"DEPRECATED"]).optional(), 
    body('version').optional(), 
    updateUpdate)
router.post("/update", 
    body('title').exists().isString(), 
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete("/update/:id", deleteUpdate)


/*
Update Point 
*/
// router.get("/updatepoint", getUpdates)
// router.get("/updatepoint/:id", getOneUpdate)
// router.put("/updatepoint/:id",
//     body('name').optional().isString(),
//     body('description').optional().isString(),
//     updateUpdate)
// router.post("/updatepoint", 
//     body('name').optional().isString(),
//     body('description').optional().isString(),
//     body('updateId').exists().isString(),
//     createUpdate)
// router.delete("/updatepoint/:id", deleteUpdate)


export default router