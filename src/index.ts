import express = require('express');
import moment = require('moment');


const dateFormat = 'MMMM D, YYYY';

interface TimeResult {
  unix: number;
  natural: string;
}


function parseTime(time: string): TimeResult {
  let m = moment(time, dateFormat);
  if (!m.isValid()) {
    m = moment.unix(parseInt(time));
  }
  if (!m.isValid()) {
    m = null;
  }
  return {
    unix: m && m.unix(),
    natural: m && m.format(dateFormat),
  }
}


const app = express();

app.get('/:time', (req, res) => {
  const result = parseTime(req.params.time);
  res.send(result);
});

app.listen(process.env.PORT, () =>
  console.log(`Running on http://localhost:${process.env.PORT}/`));

