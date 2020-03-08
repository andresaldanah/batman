// 1. CREATE
// 2. READ
// 3. UPDATE
// 4. DELETE

let peliculas = [];

async function obtenerDatosYRenderizar() {
  let response = await fetch('/peliculas');
  if(response.ok){
      let data = await response.json();
      peliculas = data.peliculas;
      renderizarPeliculas();
    }  
}

obtenerDatosYRenderizar();

function renderizarPeliculas() {
    let columnas = '';
    peliculas.forEach(function(item, index){
    columnas += `
    <div class="col-sm-12 col-md-6 col-lg-3">
    <div class="card">
        <img src="${item.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
					<h5 class="card-title">
						<a href="/pelicula?imdbID=${item.imdbID}">${item.Title}</a>					
					</h5>
                    <p class="card-text">${item.Year} - ${item.Type}</p>
                    <button type="button" class="btn btn-primary" onclick="editar(${item.imdbID})">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="eliminar(${item.imdbID})">Eliminar</button>
                </div>
    </div>
  </div>`
});
document.getElementById("peliculas").innerHTML = columnas;
}

// renderizarPeliculas();

function guardarPelicula(event){
    event.preventDefault();

let imdbID = document.getElementById('imdbID').value;

if(!imdbID){
  let pelicula = {
    Title: document.getElementById('Title').value,
    Year: document.getElementById('Year').value,
    Poster: document.getElementById('Poster').value,
    Type: document.getElementById('Type').value,
    imdbID: peliculas.length + 1
  };
  crearPelicula(pelicula);
}   else {
  let pelicula = {
   Title: document.getElementById('Title').value,
   Year: document.getElementById('Year').value,
   Poster: document.getElementById('Poster').value,
   Type: document.getElementById('Type').value,
   imdbID: imdbID
 };
 
 
editarPelicula(pelicula);

}    

$('#exampleModal').modal('hide');
    event.target.reset();
renderizarPeliculas();
}


// Llamada a API y Crear Pelicula

async function crearPelicula(pelicula) {
  let response = await fetch('/peliculas', {
    method:'POST',
    body: JSON.stringify(pelicula),
    headers: {"Content-Type":"application/json"}
  });  

	if (response.ok) {
		let data = await response.json();
    let mensaje = data.mensaje;
    alert(mensaje);
    obtenerDatosYRenderizar();
	}
}

// Editar película

async function editarPelicula(pelicula) {
  let response = await fetch('/peliculas', {
    method:'PUT',
    body: JSON.stringify(pelicula),
    headers: {"Content-Type":"application/json"}
  });  

	if (response.ok) {
		let data = await response.json();
    let mensaje = data.mensaje;
    alert(mensaje);
    obtenerDatosYRenderizar();
	}
}

// Borrar pelicula

async function borrarPelicula(imdbID) {
  let response = await fetch('/peliculas/' + imdbID, {
    method:'DELETE',
  });  

	if (response.ok) {
		let data = await response.json();
    let mensaje = data.mensaje;
    alert(mensaje);
    obtenerDatosYRenderizar();
	}
}


function editar (imdbID){
  let pelicula =  peliculas.find(function(item){
      return item.imdbID == imdbID;
});

document.getElementById('imdbID').value = pelicula.imdbID;
document.getElementById('Title').value = pelicula.Title;
document.getElementById('Year').value = pelicula.Year;
document.getElementById('Poster').value = pelicula.Poster;
document.getElementById('Type').value = pelicula.Type;

$('#exampleModal').modal('show');
}

// Eliminar película

let imdbID;

function eliminar (_imdbID){
  imdbID = _imdbID;
 
 
$('#eliminarModal').modal('show');
}

// confirmar

function confirmar (){

  borrarPelicula(imdbID);
  $('#eliminarModal').modal('hide');

}
