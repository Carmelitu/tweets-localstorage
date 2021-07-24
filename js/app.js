// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listeners
eventListeners();

function eventListeners(){
    // Carga tweet al enviar formulario
    formulario.addEventListener('submit', agregarTweet);

    // Carga tweets cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}

// Funciones

// Agrega Tweet al enviar formulario
function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if (tweet === ''){
        mostrarError('El tweet no puede ir vacío');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Se agrega ultimo tweet al arreglo
    tweets =[...tweets, tweetObj];

    crearHTML();

    // Reiniciar formulario
    formulario.reset();
}

// Muestra error recibido por parametro
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    /*const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);*/

    formulario.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra listado de tweets
function crearHTML(){
    limpiarHTML();

    if (tweets.length > 0){
        tweets.forEach( tweet => {
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Limpia HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// Agrega los tweets a Local Storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}