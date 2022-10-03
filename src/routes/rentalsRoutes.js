import express from 'express';
import { endRentals, getRentals, postRentals } from '../controllers/rentalsControllers.js';


const rentalsRoutes = express.Router();
rentalsRoutes.get("/rentals", getRentals); 
rentalsRoutes.post("/rentals", postRentals); 
rentalsRoutes.put("/rentals/:id/return", endRentals);

export default rentalsRoutes;