const express = require('express');
const router = express.Router();
const Intern = require('../models/internModel');

// Get intern data
router.get('/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.json(intern);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get leaderboard
router.get('/leaderboard/all', async (req, res) => {
  try {
    const leaderboard = await Intern.find().sort({ donationsRaised: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;