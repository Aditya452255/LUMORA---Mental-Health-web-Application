const express = require('express');
const router = express.Router();

// Public endpoint to return configured game URLs
router.get('/', (req, res) => {
  const games = {
    1: { id: 1, title: 'Chess', endpoint: process.env.GAME_1 || '' },
    2: { id: 2, title: 'Sudoku', endpoint: process.env.GAME_2 || '' },
    3: { id: 3, title: 'Sliding Puzzle', endpoint: process.env.GAME_3 || '' },
    4: { id: 4, title: 'Memory Card', endpoint: process.env.GAME_4 || '' },
    5: { id: 5, title: 'Minesweeper', endpoint: process.env.GAME_5 || '' },
    6: { id: 6, title: 'Tic Tac Toe', endpoint: process.env.GAME_6 || '' },
  };

  res.json({ games });
});

module.exports = router;
