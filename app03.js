const express = require('express');
const axios = require('axios');
const app = express();

// serve the HTML form at the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// endpoint to handle search requests
app.get('/search', async (req, res) => {
  const { q } = req.query;
  const apiUrl = `https://en25tugipnarr.x.pipedream.net/?q=${q}`;
  
  try {
    const response = await axios.get(apiUrl);
    const results = response.data.results;
    
    res.send({ success: true, results });
  } catch (error) {
    console.error(error);
    res.send({ success: false, error });
  }
});

// start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

