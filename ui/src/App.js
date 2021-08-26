import React, { useState } from "react";
import Login from "./Login";
import Todo from "./Apptodo";
import { Route, Switch } from "react-router-dom";

function App()
{
    const [user, setUserName] = useState("");
    const [isloggedin, setIsLoggedIn] = useState(false);

    return(
        <Switch>
            <Route exact path = "/login">
                <Login isloggedin = {isloggedin} setIsLoggedIn = {setIsLoggedIn} user = {user} setUserName = {setUserName}/>
            </Route>
            <Route exact path = '/todo'>
                <Todo isloggedin = {isloggedin} user = {user} />
            </Route>
        </Switch>
    );
}

export default App;