// INICIAR NODE.JS

// Para Instalar node.js
// node init
// npm install express
// npm install body-parser

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

// Base de datos

let peliculas = [
    {
      "Title": "Batman Begins",
      "Year": "2005",
      "imdbID": "1",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
    },
    {
      "Title": "Batman v Superman: Dawn of Justice",
      "Year": "2016",
      "imdbID": "2",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
      "Title": "Batman",
      "Year": "1989",
      "imdbID": "3",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
    },
    {
      "Title": "Batman Returns",
      "Year": "1992",
      "imdbID": "4",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman Forever",
      "Year": "1995",
      "imdbID": "5",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      "Title": "Batman & Robin",
      "Year": "1997",
      "imdbID": "6",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
    },
    {
      "Title": "The Lego Batman Movie",
      "Year": "2017",
      "imdbID": "7",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: The Animated Series",
      "Year": "1992–1995",
      "imdbID": "8",
      "Type": "series",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: Under the Red Hood",
      "Year": "2010",
      "imdbID": "9",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    },
    {
      "Title": "Batman: The Dark Knight Returns, Part 1",
      "Year": "2012",
      "imdbID": "10",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"
    },
  
  ];

// Fin de la base de datos


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

// // Parametros API: GET / POST / PUT / DELETE

// //GET

// app.get("/saludar/:nombre", (req, res) => {
//     res.send({ mensaje: 'Hola! ' + req.params.nombre });
// });

// // POST

// app.post('/saludar', (req, res) => {
// 	res.send({ mensaje: 'Hola! Post ' + req.body.nombre + ' ' + req.body.apellido });
// });

// // PUT

// app.put('/saludar', (req, res) => {
// 	res.send({ mensaje: 'Hola! Put Method ' + req.body.nombre + ' ' + req.body.apellido });
// });

// // DELETE

app.get("/pelicula", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pelicula.html"));
  });

// Mostrar base de datos 

app.get('/peliculas', function (req, res) {
	res.send({ peliculas: peliculas });
});

app.get('/peliculas/:imdbID', function (req, res) {
    let imdbID = req.params.imdbID;
    let pelicula = peliculas.find(function(item){
        return item.imdbID == imdbID;
    });
	res.send({ pelicula: pelicula });
});

// Agregar una pelicula

app.post('/peliculas', function (req, res) {
    let pelicula = req.body;
    peliculas.push(pelicula);
	res.send({ mensaje: 'Registro creado' });
});

// Cambiar una pelicula

app.put('/peliculas', function (req, res) {
    let pelicula = req.body;
    let index = peliculas.findIndex(function(item){
        return item.imdbID == pelicula.imdbID
      });
      peliculas[index]=pelicula;
      res.send({ mensaje: 'Registro actualizado'});
});

//  Borrar una pelicula

app.delete('/peliculas/:imdbID', function (req, res) {
    let imdbID = req.params.imdbID
    let index = peliculas.findIndex(function(item){
        return item.imdbID == imdbID
      });
      peliculas.splice(index,1);
      res.send({ mensaje: 'Registro eliminado'});
});

const port = process.env.PORT || "9000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port: ${port}`));

