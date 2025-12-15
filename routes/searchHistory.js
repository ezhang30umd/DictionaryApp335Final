const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');

// View all search history
router.get('/', async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ searchDate: -1 })
      .limit(50);
    
    res.render('history', { 
      title: 'Search History',
      history: history 
    });
  } catch (error) {
    res.render('history', { 
      title: 'Search History',
      history: [],
      error: 'Error loading search history'
    });
  }
});

// Clear search history
router.post('/clear', async (req, res) => {
  try {
    await SearchHistory.deleteMany({});
    res.redirect('/history');
  } catch (error) {
    res.redirect('/history');
  }
});

module.exports = router;
