import express from 'express';

import DebugToolbar from './';

import log from './logging';

const app = express();

DebugToolbar.attach(app);

app.all('/', (req, res) => {
  res.send('Yep, it still works!');
});

app.get('/status/:code', (req, res) => {
  const c = parseInt(req.params.code);

  res.status(c).send(`This should be a ${c} error`);
});

app.listen(8000, () => {
  log(`Test server has started`);
});
