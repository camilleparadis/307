const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

// get users by name, job, or name & job
// http://localhost:5001/users?name=Mac 

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job == undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    if (name == undefined && job != undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    if (name != undefined && job != undefined){
        let result = findUserByNameandJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

const findUserByNameandJob = (name, job) => { 
    return users['users_list'].filter( (user) => user['job'] === job && user['name'] === name); 
}

// get users by id
// http://localhost:5001/users/zap555

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// add user to list
// http://localhost:5001/users
// use boomerang

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    // res.status(201).end();
    // use the http response to attach JSON object
    res.status(201).send(userToAdd);
});

function addUser(user){
    user['id'] = uniqueID();
    users['users_list'].push(user);
}

function uniqueID(){
    // Math.floor rounds down, Date.now() returns # of ms since jan 1, 1970 (contributes to uniqueness)
    // multiply by math.random to ensure unique incase multiple inputs at same ms
    return Math.floor(Math.random() * Date.now());
}

// delete user from list
// http://localhost:5001/users
// use boomerang

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = deleteUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function deleteUserById(id){
    // use filter function
    users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
}

