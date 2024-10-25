// routes/personRoutes.js
const express = require('express');

module.exports = (controller) => {
    const router = express.Router();

    router.post('/', controller.createPerson);
    router.get('/', controller.getAllPersons);
    router.get('/:personId', controller.getPerson);
    router.put('/:personId', controller.updatePerson);
    router.delete('/:personId', controller.deletePerson);

    return router;
};
