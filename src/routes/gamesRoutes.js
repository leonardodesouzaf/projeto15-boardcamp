import express from 'express';
import { getGames, postGames } from '../controllers/gamesControllers.js';
import gamesSchema from '../schemas/gamesSchema.js';

const gamesRoutes = express.Router();
gamesRoutes.get("/games", getGames); 
gamesRoutes.post("/games", gamesSchema, postGames); 

export default gamesRoutes;