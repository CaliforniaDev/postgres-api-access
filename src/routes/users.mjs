import express from 'express';
import UserRepo from '../repos/user-repo.mjs';
const router = express.Router();

// Route to get all users
router.get('/users', async (req, res) => {
  // Run a query to get all users
  const users = await UserRepo.find();
  // Send the result back to the client
  res.send(users);
});

// Route to get a user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  const user = await UserRepo.findById(id); // Find user by ID
  if (!user) {
    return res.sendStatus(404); // Send 404 if user not found
  }
  res.send(user); // Send the user data
});

// Route to create a new user
router.post('/users', async (req, res) => {
  // Implementation for creating a new user goes here
});

// Route to update a user by ID
router.put('/users/:id', async (req, res) => {
  // Implementation for updating a user goes here
});

// Route to delete a user by ID
router.delete('/users/:id', async (req, res) => {
  // Implementation for deleting a user goes here
});

export default router;
