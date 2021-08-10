import React ,{ useState } from 'react';
import axios from 'axios';
import './Apptodo.css'
import { Redirect } from 'react-router-dom';

function Todo(props){

    const [area, setArea] = useState({
        inputtext: ""
    });

    function changedInputText(e){
        setArea({...area, inputtext: e.target.value});
    }

    function savenote(area){
        axios.post('http://localhost:8080/save', area)
        .then((response) => {
            setArea({...area, resback1: response.data,})
        })
        .catch((error) => {
            console.log(error);
        });
    }

    if(!props.isloggedin){
        return(
            <Redirect to = '/login' />
        )
    }

    else{
        return(
            <div className="todo">
                <textarea className = "txt" placeholder = "Add a note" name = "body" onChange = {changedInputText} />
                <button type = "button" onClick = {() => savenote(area)}>Save</button>
            </div>
    
        )
    }
}

export default Todo;