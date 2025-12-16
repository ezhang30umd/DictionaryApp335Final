const express = require('express');
const router = express.Router();
const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');

const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Search word
router.post('/search', async (req, res) => {
  try {
    const { word } = req.body;
    
    if (!word) {
      return res.render('result', { 
        title: 'Search Result',
        error: 'Please enter a word to search',
        data: null 
      });
    }

    // Call Dictionary API
    const response = await axios.get(`${DICTIONARY_API_URL}/${word}`);
    const data = response.data;

    // Save search to database
    const searchRecord = new SearchHistory({
      word: word.toLowerCase(),
      searchDate: new Date(),
      resultFound: true
    });
    await searchRecord.save();

    res.render('result', { 
      title: `Definition: ${word}`,
      error: null,
      data: data,
      word: word
    });

  } catch (error) {
    // Word not found or API error
    const { word } = req.body;
    
    // Save failed search to database
    const searchRecord = new SearchHistory({
      word: word ? word.toLowerCase() : 'unknown',
      searchDate: new Date(),
      resultFound: false
    });
    await searchRecord.save();

    res.render('result', { 
      title: 'Search Result',
      error: 'Word not found or an error occurred',
      data: null,
      word: word
    });
  }
});

module.exports = router;