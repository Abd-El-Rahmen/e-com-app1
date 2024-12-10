import express from "express";
import upload from "../../helpers/uploadImage.js";

import { handleImageUpload, addProduct,updateProduct,deleteProduct,fetchAllProducts} from '../../controllers/admin/productsController.js'

const router = express.Router();
router.post("/upload-image", upload.single("image"), handleImageUpload);
router.get("/all",fetchAllProducts );
router.post("/add", addProduct);
router.put("/update/:id",updateProduct );
router.delete("/delete/:id",deleteProduct );

export default router;
