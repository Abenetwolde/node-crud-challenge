const { v4: uuidv4 } = require('uuid');

let persons =  [{
    id: '1',
    name: 'Sam',
    age: 26,
    hobbies: []
}]; 

const initializePersonModel = (db) => {
    persons = db; 
}

const createPerson = (data) => {
    const { name, age, hobbies } = data;


    const newPerson = {
        id: uuidv4(),
        name,
        age: Number(age), 
        hobbies: hobbies || [] 
    };

    persons.push(newPerson);

    return newPerson; 
};


const getPerson = (id) => persons.find(person => person.id === id) || null;


const getAllPersons = () => persons;


const updatePerson = (id, data) => {
    const index = persons.findIndex(person => person.id === id);
    if (index === -1) return null;

    persons[index] = { ...persons[index], ...data };
    return persons[index];
};


const deletePerson = (id) => {
    const index = persons.findIndex(person => person.id === id);
    if (index === -1) return false;

    persons.splice(index, 1);
    return true;
};

module.exports =  {
    initializePersonModel,

        createPerson,
        getPerson,
        getAllPersons,
        updatePerson,
        deletePerson,
  
};
