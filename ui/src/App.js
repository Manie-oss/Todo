import React, { useState } from "react";
import Login from "./Login";
import Todo from "./Apptodo";
import { Route, Switch } from "react-router-dom";

function App()
{
    const [isloggedin, setIsLoggedIn] = useState(false);

    return(
        <Switch>
            <Route exact path = "/login">
                <Login isloggedin = {isloggedin} setIsLoggedIn = {setIsLoggedIn}/>
            </Route>
            <Route exact path = '/todo'>
                <Todo isloggedin = {isloggedin} />
            </Route>
        </Switch>
    );
}

export default App;