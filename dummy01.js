const express = require('express');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002']
}));
app.get('/api/organisations', (req, res) => {
  const query = req.query.q || '';
  const data = [
    { id: 1, organisation_name: 'IKHP Huskvarna 1', shortName: 'Org 1', mediaName: 'Organisation 1 Media', parentOrgId: 0, organisation_country: 'SWE' },
    { id: 2, organisation_name: 'Jönköpings OK 2', shortName: 'Org 2', mediaName: 'Organisation 2 Media', parentOrgId: 1, organisation_country: 'SWE' },
    { id: 3, organisation_name: 'Organisation 3', shortName: 'Org 3', mediaName: 'Organisation 3 Media', parentOrgId: 1, organisation_country: 'SWE' },
    { id: 4, organisation_name: 'Organisation 4', shortName: 'Org 4', mediaName: 'Organisation 4 Media', parentOrgId: 0, organisation_country: 'SWE' },
    { id: 5, organisation_name: 'Organisation 5', shortName: 'Org 5', mediaName: 'Organisation 5 Media', parentOrgId: 4, organisation_country: 'SWE' }
  ];

  const filteredData = data.filter(org => org.organisation_name.toLowerCase().includes(query.toLowerCase()));
  res.json(filteredData);
});

app.listen(port, () => {
  console.log(`Dummy backend listening at http://localhost:${port}`);
});

