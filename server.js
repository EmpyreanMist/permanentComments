import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 5080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
