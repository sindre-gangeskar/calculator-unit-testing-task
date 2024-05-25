var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const { save, load } = require('../data/custom');
const { add } = require('../data/calculator');
const numbers = path.resolve(__dirname, '../data/numbers.json');

/* GET home page. */
router.get('/sum/:number1/:number2', async function (req, res, next) {
  const { number1, number2 } = req.params;
  
  if (number1 == null || number2 == null) {
    res.status(400).send('Please provide numbers');
    return;
  }

  if (isNaN(parseInt(number1)) || isNaN(parseInt(number2))) {
    res.status(400).send('Both values must be integers');
    return;
  }
    
  const data = await load(numbers);
  const favoriteNumber = data.favoriteNumber;

  const total = add(number1, number2) + parseInt(favoriteNumber);
  res.status(200).json({ sum: total });
});

router.post('/favNumber', async function (req, res, next) {
  const data = await load(numbers);
  data.favoriteNumber = req.body.favoriteNumber;
  
  save(data, numbers);
  res.status(200).json({ message: 'Successfully saved favorite number', favoriteNumber: req.body.favoriteNumber })
})

router.delete('/favNumber', async function (req, res, next) {
  const data = await load(numbers);
  data.favoriteNumber = 0;
  save(data, numbers);
  res.status(201).json({ message: 'Successfully reset favorite number', value: data.favoriteNumber });
})

module.exports = router;
