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
  const user = await UserRepo.findById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  // Send the user data back to the client
  res.send(user);
});

// Route to create a new user
router.post('/users', async (req, res) => {
  const { username, bio } = req.body;
  const user = await UserRepo.insert(username, bio);
  res.send(user);
});

// Route to update a user by ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;
  const user = await UserRepo.update(id, username, bio);
  if (!user) {
    return res.sendStatus(404);
  }
  res.send(user);
});

// Route to delete a user by ID
router.delete('/users/:id', async (req, res) => {
  // Implementation for deleting a user goes here
});

export default router;
