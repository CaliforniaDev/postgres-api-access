import express from 'express';
import UserRepo from '../repos/user-repo.mjs';
const router = express.Router();

router.get('/users', async (req, res) => {
  // Run a query to get all
  const users = await UserRepo.find();
  // Send the result back to the client
  // Who made this request?
  res.send(users);
});

router.get('/users/:id', async (req, res) => {});

router.post('/users', async (req, res) => {});

router.put('/users/:id', async (req, res) => {});

router.delete('/users/:id', async (req, res) => {});

export default router;
