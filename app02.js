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

   <form method="POST" action="/submit">
      <label for="event-id">Event ID:</label>
      <input type="text" id="event-id" name="eventId"><br>

      <label for="event-name">Event Name:</label>
      <input type="text" id="event-name" name="eventName"><br>

      <label for="event-date">Event Date:</label>
      <input type="date" id="event-date" name="eventDate"><br>

      <label for="event-start-time">Event Start Time:</label>
      <input type="time" id="event-start-time" name="eventStartTime"><br>

      <label for="person-id">Person ID:</label>
      <input type="text" id="person-id" name="personId"><br>

      <label for="person-given-name">Person Given Name:</label>
      <input type="text" id="person-given-name" name="personGivenName"><br>

      <label for="person-family-name">Person Family Name:</label>
      <input type="text" id="person-family-name" name="personFamilyName"><br>

      <label for="person-birth-date">Person Birth Date:</label>
      <input type="date" id="person-birth-date" name="personBirthDate"><br>

      <label for="person-nationality">Person Nationality:</label>
      <input type="text" id="person-nationality" name="personNationality"><br>

      <label for="organisation-id">Organisation ID:</label>
      <input type="text" id="organisation-id" name="organisationId"><br>


      <label for="organisation_name">Organisation Name:</label>
      <input type="text" id="organisation_name" name="organisation_name"><br>


      <label for="organisation_short_name">Organisation Short Name:</label>
      <input type="text" id="organisation_short_name" name="organisation_short_name"><br>

      <label for="organisation_media_name">Organisation Media Name:</label>
      <input type="text" id="organisation_media_name" name="organisation_media_name"><br>

      <label for="organisation_country">Organisation Country:</label>
      <input type="text" id="organisation_country" name="organisation_country"><br>

      <label for="control-card">Control Card:</label>
      <input type="text" id="control-card" name="controlCard"><br>

      <label for="class-id">Class ID:</label>
      <input type="text" id="class-id" name="classId"><br>

      <label for="class-name">Class Name:</label>
      <input type="text" id="class-name" name="className"><br>

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
