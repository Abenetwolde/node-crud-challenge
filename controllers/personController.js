const personModel = require('../models/personModel');
const { validatePerson } = require('../validations/personValidation');
const { sendErrorResponse, asyncHandler, CustomError } = require('../utils/errorHandler');

const createPerson = asyncHandler((req, res) => {
    const { error, value } = validatePerson(req.body);
    if (error) return sendErrorResponse(res, 400, error.details[0].message);

    const newPerson = personModel.createPerson(value);
    return res.status(200).json(newPerson);
});

const getPerson = asyncHandler((req, res) => {
    const { personId } = req.params;
    const person = personModel.getPerson(personId);
     if (!person) throw new CustomError(404, 'Person not found');
    return res.status(200).json(person);
});

const getAllPersons = asyncHandler((req, res) => {
    const persons = personModel.getAllPersons();
    return res.status(200).json(persons);
});

const updatePerson = asyncHandler((req, res) => {
    const { personId } = req.params;
    const { error, value } = validatePerson(req.body);
    if (error) return sendErrorResponse(res, 400, error.details[0].message);

    const updatedPerson = personModel.updatePerson(personId, value);
    if (!updatedPerson) throw new CustomError(404, 'Person not found');
    return res.status(200).json(updatedPerson);
});

const deletePerson = asyncHandler((req, res) => {
    const { personId } = req.params;
    const deleted = personModel.deletePerson(personId);
    if (!deleted) throw new CustomError(404, 'Person not found');
    return res.status(204).send();
});

module.exports = (app) => {
    const db = app.get('db');
    personModel.initializePersonModel(db);

    return {
        createPerson,
        getPerson,
        getAllPersons,
        updatePerson,
        deletePerson,
    };
};
