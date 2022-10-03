import express from 'express';
import { getCategories, postCategories } from '../controllers/categoriesControllers.js';
/* import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'; */

const categoriesRoutes = express.Router();
categoriesRoutes.get("/categories", getCategories); 
categoriesRoutes.post("/categories", postCategories); 

export default categoriesRoutes;