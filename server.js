var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
const { response } = require("express");

var app = express();
var http = require("http").createServer(app);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "*"
}));

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "sai_krishna"
    
    // user : "",
    // password : "",
    // database : "",
    // port : 3306 
})

connection.connect((error) => {
    if(error){
        throw error;
    }
    else{
        console.log("MySQL Database is connected successfully")
    }
})

// http://localhost:3000/list
app.get("/list", (request, response) => {
    var sqlQuery = `SELECT * FROM sai_krishna`;

    connection.query( sqlQuery, (error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send(result);
        }
    })

});


// http://localhost:3000/create
/*
    "name" : "",
    "age" : "",
    "location" : "",
    "email" : "",
    "blood_group" : ""
*/
app.post("/create", (request, response) => {
    var name = request.body.name;
    var age = request.body.age;
    var location = request.body.location;
    var email = request.body.email;
    var blood_group = request.body.blood_group;

    var sqlQuery = `INSERT INTO sai_krishna (name, age, location, email, blood_group) VALUES ('${name}', '${age}', '${location}', '${email}', '${blood_group}')`;

    connection.query(sqlQuery, (error, result) =>{
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send({
                message : "User profile has been created successfully"
            });

        } 
    });
});


//http://localhost:3000/edit/1
/*
{
  "name" : "",
  "age" : "",
  "location" : "",
  "email" : "",
  "blood_group" : ""
}
*/
app.put("/edit/:id", (request, response) => {
    var id = request.params.id;
  
    var name = request.body.name;
    var age = request.body.age;
    var _location = request.body.location;
    var email = request.body.email;
    var blood_group = request.body.blood_group;
  
    var sqlQuery = `UPDATE sai_krishna SET name='${name}', age=${age}, location='${_location}', email='${email}', blood_group='${blood_group}' WHERE id=${id}`;
  
    connection.query(sqlQuery, (error, result) => {
      if(error){
        response.status(500).send(error);
      }
      else{
        response.status(200).send({
          message : "User profile has been updated successfully"
        });
      }
    })
  
});


//http://localhost:3000/delete/1
app.delete("/delete/:id", (request, response) => {
    var id = request.params.id;
  
    var sqlQuery = `DELETE FROM sai_krishna WHERE id=${id}`;
  
    connection.query(sqlQuery, (error, result) => {
      if(error){
        response.status(500).send(error);
      }
      else{
        response.status(200).send({
          message : "User profile has been deleted successfully"
        });
      }
    })
  })

var port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("Node JS server is running on port 3000")
}) 