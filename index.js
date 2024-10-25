const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes'); // Assuming you have this file set up
const personController = require('./controllers/personController'); // Import the controller
const { errorMiddleware } = require('./utils/errorHandler');
const app = express();

const db = [{
    id: '1',
    name: 'Sam',
    age: 26,
    hobbies: []
}];

app.set('db', db);


app.use(bodyParser.json());
const controller = personController(app)
app.use('/person', personRoutes(controller)); 

app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
