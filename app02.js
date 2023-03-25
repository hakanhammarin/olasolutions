const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const convert = require('xml-js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002']
}));


app.get('/', (req, res) => {
  res.send(`
<!-- jQuery library -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- jQuery UI library -->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.0/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"></script>


<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.3/css/bootstrap.min.css">

<!-- Bootstrap JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>

<script>
$(function() {
  $("#organisation_name").autocomplete({
    source: function(request, response) {
      $.getJSON("http://localhost:3002/api/organisations?q=" + request.term, function(data) {
        response($.map(data, function(item) {
          return {
            label: item.organisation_name,
            value: item.organisation_name,
            shortName: item.shortName,
            mediaName: item.mediaName,
            parentOrgId: item.parentOrgId,
            organisation_country: item.organisation_country
          };
        }));
      });
    },
    minLength: 3,
    select: function(event, ui) {
      $('#organisation_short_name').val(ui.item.shortName);
      $('#organisation_media_name').val(ui.item.mediaName);
      $('#parent_organisation_id').val(ui.item.parentOrgId);
      $('#organisation_country').val(ui.item.organisation_country);

}
  });
});
</script>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Form</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
</head>
<style>
  form {
    margin: 4px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="date"],
  input[type="time"] {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 4px;
  }
</style>

<form class="row g-3 needs-validation mx-auto mx-md-5" method="POST" action="/submit" novalidate>
  <div class="col-md-6">
    <label for="event-name" class="form-label">Event:</label>
    <input type="text" class="form-control" id="event-name" name="eventName" required>
    <div class="invalid-feedback">
      Please enter an Event.
    </div>
  </div>
  <div class="col-md-6">
    <label for="event-id" class="form-label">Event ID:</label>
    <input type="text" class="form-control" id="event-id" name="eventId" readonly tabindex="-1">
    
  </div>
  <div class="col-md-6">
    <label for="event-date" class="form-label">Event Date:</label>
    <input type="date" class="form-control" id="event-date" name="eventDate" readonly tabindex="-1">
    
  </div>
  <div class="col-md-6">
    <label for="event-start-time" class="form-label">Event Start Time:</label>
    <input type="time" class="form-control" id="event-start-time" name="eventStartTime" readonly tabindex="-1">
    
  </div>
  <div class="col-md-6">
    <label for="person-id" class="form-label">Person ID:</label>
    <input type="text" class="form-control" id="person-id" name="personId" required>
    <div class="invalid-feedback">
      Please enter a person ID.
    </div>
  </div>
<div class="col-md-6">
      <label for="person_given_name" class="form-label">Person Given Name:</label>
      <input type="text" class="form-control" id="person_given_name" name="personGivenName" required>
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="person_family_name" class="form-label">Person Family Name:</label>
      <input type="text" class="form-control" id="person_family_name" name="personFamilyName" required>
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="person_birth_date" class="form-label">Person Birth Date:</label>
      <input type="date" class="form-control" id="person_birth_date" name="personBirthDate" required>
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="person_nationality" class="form-label">Person Nationality:</label>
      <input type="text" class="form-control" id="person_nationality" name="personNationality" required>
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="organisation_id" class="form-label">Organisation ID:</label>
      <input type="text" class="form-control" id="organisation_id" name="organisationId">
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">

      <label for="organisation_name" class="form-label">Organisation:</label>
      <input type="text" class="form-control" id="organisation_name" name="organisation_name" required>

<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="organisation_short_name" class="form-label">Organisation Short Name:</label>
      <input type="text" class="form-control" id="organisation_short_name" name="organisation_short_name" readonly tabindex="-1">

  </div>
  <div class="col-md-6">
      <label for="organisation_media_name" class="form-label">Organisation Media Name:</label>
      <input type="text" class="form-control" id="organisation_media_name" name="organisation_media_name" readonly tabindex="-1">

  </div>
  <div class="col-md-6">
      <label for="organisation_country" class="form-label">Organisation Country:</label>
      <input type="text" class="form-control" id="organisation_country" name="organisation_country" readonly tabindex="-1">

  </div>
  <div class="col-md-6">
      <label for="control_card" class="form-label">Control Card:</label>
      <input type="text" class="form-control" id="control_card" name="controlCard">
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="class_id" class="form-label">Class ID:</label>
      <input type="text" class="form-control" id="class_id" name="classId">
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
  <div class="col-md-6">
      <label for="class_name" class="form-label">Class:</label>
      <input type="text" class="form-control" id="class_name" name="className">
<div class="invalid-feedback">
      Please enter an event name.
    </div>
  </div>
      <input type="submit" value="Submit">
    </form>
  `);
});


app.post('/submit', (req, res) => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<EntryList createTime="${new Date().toISOString()}" creator="Eventor" iofVersion="3.0" xmlns="http://www.orienteering.org/datastandard/3.0" xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<Event modifyTime="${new Date().toISOString()}">
		<Id type="Sweden">${req.body.event_id}</Id>
		<Name>${req.body.event_name}</Name>
		<StartTime>
			<Date>${req.body.event_start_date}</Date>
			<Time>${req.body.event_start_time}Z</Time>
		</StartTime>
		
	</Event>
	<PersonEntry modifyTime="${new Date().toISOString()}">
		<Id type="Sweden">${req.body.person_id}</Id>
		<Person modifyTime="${new Date().toISOString()}" sex="${req.body.person_sex}">
			<Id type="Sweden">${req.body.person_sweden_id}</Id>
			<Name>
				<Family>${req.body.person_family_name}</Family>
				<Given>${req.body.person_given_name}</Given>
			</Name>
			<BirthDate>${req.body.person_birth_date}</BirthDate>
			<Nationality code="${req.body.person_nationality_code}">${req.body.person_nationality}</Nationality>
		</Person>
		<Organisation modifyTime="${new Date().toISOString()}" type="${req.body.organisation_type}">
			<Id type="Sweden">${req.body.organisation_id}</Id>
			<Name>${req.body.organisation_name}</Name>
			<ShortName>${req.body.organisation_short_name}</ShortName>
			<MediaName>${req.body.organisation_media_name}</MediaName>
			<ParentOrganisationId>${req.body.organisation_parent_id}</ParentOrganisationId>
			<Country code="${req.body.organisation_country}">${req.body.organisation_country}</Country>
		</Organisation>
		<ControlCard punchingSystem="${req.body.control_card_punching_system}">${req.body.control_card_number}</ControlCard>
		<Class>
			<Id type="Sweden">${req.body.class_id}</Id>
			<Name>${req.body.class_name}</Name>
		</Class>
		<Extensions>
         
        </Extensions>
		<EntryTime>${new Date().toISOString()}</EntryTime>
	</PersonEntry>
</EntryList>`;

  axios.post('https://en25tugipnarr.x.pipedream.net/', xml)
    .then(response => {
      console.log(response.data);
      res.send('Form submitted successfully!');
    })
    .catch(error => {
      console.error(error);
      res.send('Form submission failed.');
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
