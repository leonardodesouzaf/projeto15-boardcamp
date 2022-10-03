import express from 'express';
import { getRentals } from '../controllers/rentalsControllers';


const rentalsRoutes = express.Router();
rentalsRoutes.get("/rentals", getRentals); 

export default rentalsRoutes;