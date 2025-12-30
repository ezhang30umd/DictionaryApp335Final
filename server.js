const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
// require("dotenv").config({
//    path: path.resolve(__dirname, "credentialsDontPost/.env"),
// });

const app = express();
const portNumber = process.env.portNumber || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // specify layout file

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const indexRouter = require('./routes/index');
const dictionaryRouter = require('./routes/dictionary');
const searchHistoryRouter = require('./routes/searchHistory');

app.use('/', indexRouter);
app.use('/dictionary', dictionaryRouter);
app.use('/history', searchHistoryRouter);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(portNumber, () => {
  console.log(`Server running at http://localhost:${portNumber}`);
});