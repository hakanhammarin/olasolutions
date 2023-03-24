const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
      <label for="field1">Field 1:</label>
      <input type="text" id="field1" name="field1"><br>

      <label for="field2">Field 2:</label>
      <input type="text" id="field2" name="field2"><br>

      <label for="field3">Field 3:</label>
      <input type="text" id="field3" name="field3"><br>

      <label for="field4">Field 4:</label>
      <input type="text" id="field4" name="field4"><br>

      <label for="field5">Field 5:</label>
      <input type="text" id="field5" name="field5"><br>

      <input type="submit" value="Submit">
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const data = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    field4: req.body.field4,
    field5: req.body.field5,
  };
  
  axios.post('http://your-backend-api-endpoint', data)
    .then(response => {
      console.log(response.data);
      res.send('Data submitted successfully!');
    })
    .catch(error => {
      console.log(error);
      res.send('Error submitting data!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

