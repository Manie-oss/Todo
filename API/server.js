const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./database');

app.use(bodyParser.json());

app.use(cors());

app.post('/login', (req,res) => {
    var name = req.body.username;
    var pass = req.body.password;

    connection.query('select name, password from logindetails where name = ? and password = ?', [name, pass], (err, result, fields) => {
        if (err) {
            console.error(err);
            res.end('Could not find username ' + name);
            return;
        }

        if (result && result.length == 1) {
            res.end('Login Successful');
        } else {
            res.end('Invalid username or password');
            return;
        }
    })

});

app.post('/newaccount', (req, res) => {
    var name = req.body.username; 
    var pass = req.body.password;
    
    if(name === ""){
        res.end("Please enter valid Username");
    }

    else if(pass === ""){
        res.end("Please enter valid Password");
    }

    else{
        connection.query('select name from logindetails where name = ?', [name], (err, result, fields) => {
            if(result.length === 0){
                connection.query('insert into logindetails values(?, ?)', [name, pass], (err, result, fields) => {
                    if (err) {
                        res.end(JSON.stringify(err));
                        return;
                    }
                    res.end('Account created.');
                    return;
                })
            }
            else{
                res.end('username already exists.')
                return;
            }
        })
    }
   
 })

 app.post('/save-todo', (req,res) => {
    var name = req.body.user;
    var input = req.body.todo;
    connection.query('insert into notes values(?, ?)', [name, input], (err, result, fields) =>{
        if (err) {
            res.end(JSON.stringify(err));
            return;
        }
        res.end(input);
        return;
    })   
 })

 app.get('/all-notes', (req, res) => {
     var name = req.query.user;
    //  console.log(name)
     connection.query('select note from notes where username = ?', [name], (err, result, fields) =>{
        if (err) {
            res.end(JSON.stringify(err));
            return;
        }
        // console.log(result);
        res.end(JSON.stringify(result));
     })
 })


var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address.port;

    console.log("this app is running at https://%s:%s", host, port);
})