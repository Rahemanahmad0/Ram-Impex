import express from 'express';
import { addAddress, updateAddress, getUserAddresses, deleteAddress } from '../controllers/addressController.js';
import authUser from '../middleware/auth.js'; // Middleware to authenticate users

const addressRouter = express.Router();

// Add a new address for the authenticated user
addressRouter.post('/add', authUser, addAddress);

// Update an existing user address for the authenticated user
addressRouter.put('/update', authUser, updateAddress);

// Get all addresses of the authenticated user
addressRouter.get('/get', authUser, getUserAddresses);

// Delete an address of the authenticated user
addressRouter.delete('/delete', authUser, deleteAddress);

export default addressRouter;
