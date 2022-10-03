import express from 'express';
import { getCategories, postCategories } from '../controllers/categoriesControllers.js';
import categoriesSchema from '../schemas/categoriesSchema.js';

const categoriesRoutes = express.Router();
categoriesRoutes.get("/categories", getCategories); 
categoriesRoutes.post("/categories", categoriesSchema, postCategories); 

export default categoriesRoutes;