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

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserRepo.findById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  res.send(user);
});

router.post('/users', async (req, res) => {});

router.put('/users/:id', async (req, res) => {});

router.delete('/users/:id', async (req, res) => {});

export default router;
