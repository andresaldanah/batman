const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

fetch('/peliculas/'+ imdbID).then(function(response){
    if(response.ok){
        response.json().then(function(data){
            let pelicula = data.pelicula;
            debugger;
            document.getElementById('Title').innerHTML = pelicula.Title;
            document.getElementById('Year').innerHTML = pelicula.Year;
            document.getElementById('Type').innerHTML = pelicula.Type;
            document.getElementById('Poster').src = pelicula.Poster;
        });
    }
});
