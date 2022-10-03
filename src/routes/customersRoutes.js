import express from 'express';
import { getCustomersByCpf, getCustomersById, postCustomers, updateCustomers } from '../controllers/customersControllers.js';
import customersSchema from '../schemas/customersSchema.js';

const customersRoutes = express.Router();
customersRoutes.get("/customers", getCustomersByCpf); 
customersRoutes.get("/customers/:id", getCustomersById); 
customersRoutes.post("/customers", customersSchema, postCustomers); 
customersRoutes.put("/customers/:id", customersSchema, updateCustomers); 

export default customersRoutes;