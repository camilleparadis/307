import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
    const [characters, setCharacters] = useState([]);
  
function removeOneCharacter (index) {
    var rid = '';
    const updated = characters.filter((character, i) => {
        if (i === index)
            rid = character['id'];
        return i !== index
    });
    // console.log(updated);
    // setCharacters(updated);
    deleteCharacterbyID(rid).then( result => {
        // if (result && result.status === 204)
        if (result.status === 204)
            console.log(updated);
            setCharacters(updated);
        });
        // console.log(characters);
    }

async function deleteCharacterbyID(id){
    try {
       let str = 'http://localhost:5001/users/' + String(id);
       const response = await axios.delete(str);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
}

function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
    // is this the correct way to implement repsonse.data?
        person = result.data;
        setCharacters([...characters, person] );
    });
}

async function fetchAll(){
    try {
        const response = await axios.get('http://localhost:5001/users');
        return response.data.users_list;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
    }

useEffect(() => {
    fetchAll().then( result => {
        if (result)
            setCharacters(result);
    });
}, [] );

async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5001/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
}

return (
    <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
    </div>
    )
}
export default MyApp;
