import React ,{ useState } from 'react';
// import todo from '../images/todo.jpg';
import axios from 'axios';
import './Apptodo.css'
import { Redirect } from 'react-router-dom';

function Todo(props){
    
    const [newTodo, setNewTodo] = useState('');
    const [existingTodos, setExistingTodos] = useState([]);

    const [savedNewTodo, setSavedNewTodo] = useState(false);

    function changedInputText(e){
        setNewTodo(e.target.value);
    }

    function saveTodo() {
        axios.post('http://localhost:8080/save-todo', { user: props.user, todo: newTodo })
        .then((response) => {
            setExistingTodos([...existingTodos, response.data]);   
            setSavedNewTodo(true);
            setTimeout(() => setSavedNewTodo(false), 5000);         
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function getNotes(usernotes){
        axios.get('http://localhost:8080/all-notes', { params: { user: props.user } })
        .then((response) => {
            setExistingTodos(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    if(!props.isloggedin){
        return(
            <Redirect to = '/login' />
        )
    }

    else{
        return(
            <div className="background">
                <div className="todo">
                <p>Welcome, {props.user}!</p>
                <textarea className = "txt" placeholder = "Add a note" name = "body" onChange = {changedInputText} />
                <button type = "button" onClick = {() => saveTodo()}>Save</button>
                <button type = "button" onClick = {() => getNotes()}>All notes</button>
                </div>
                { savedNewTodo &&
                    <small style={{color: 'green'}}>Added a TODO...</small>
                }
                
                <div className="allnotes">
                {
                    existingTodos.map((todo) => <li>{todo.note}</li>)
                }
                </div>
            </div>
    
        )
    }
}

export default Todo;