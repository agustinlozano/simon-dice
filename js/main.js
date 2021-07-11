let secuenciaUsuario = [];
let secuenciaMaquina = [];
let ronda = 0;
const user = 'GuyFromMordor'; //document.querySelector('#user');

document.querySelector('.btn').onclick = function(event) {
    event.preventDefault();
    comenzarPartida();
}

comenzarPartida = () => {
    reiniciarSecuencias();
    gestionarPartida();
}



// Definicion de funcioes
gestionarPartida = () => {
    actualizarEstado('maquina');
    bloquearTablero();

    const $cuadroMaquina = generarCuadroAleatorio();
    secuenciaMaquina.push($cuadroMaquina);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(function($cuadroMaquina, index){
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(() => {
            resaltar($cuadroMaquina);
        }, RETRASO_MS);
    });

    setTimeout(() => {
        actualizarEstado(user);
        desbloquearTablero();
    }, RETRASO_TURNO_JUGADOR);   
    
    secuenciaUsuario = [];
    ronda++;
    actualizarRonda(ronda);
}


manejarInputUser = (event) => {
    const $cuadroUser = event.target;
    resaltar($cuadroUser);
    secuenciaUsuario.push($cuadroUser);

    // Realizar la comprobacion
    for(let i = 0; i<secuenciaUsuario.length; i++) {
        if(secuenciaUsuario[i] != secuenciaMaquina[i]){
            gameOver();
            return;
        }
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        bloquearTablero();
        setTimeout(gestionarPartida(), 1000); 
    }
}




// Funciones auxiliares
bloquearTablero = () => {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
        };
    });
    /* $cuadro.onclick = function() {}; 
       Igualar los cada cuadro a una funcion vacia inhabilita el cuadro   
    */
}

reiniciarSecuencias = () => {
    secuenciaMaquina = [];
    secuenciaMaquina = [];
    ronda = [];
}
desbloquearTablero = () => {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUser; // Ver sobre esta linea.
    });
}
generarCuadroAleatorio = () => {
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);
        /* (Math.random) genera un numero 0.579..., 
           (Math.random * 4) genera un numero 1.858..., 2.584...
           (Math.floor(Math.random()*4)) genera un numero entre 0 y 3.
        */
    return $cuadros[indice];
}
resaltar = ($cuadro) => {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    }, 500);
}
actualizarEstado = (jugadorActual) => {
    const estado = document.querySelector('#estado');
    
    if(jugadorActual != 'maquina') {
        estado.innerHTML = `${jugadorActual}, es tu turno!`;    
    } else {
        estado.innerHTML = `Ahora le toca a tu rival, la invensible ${jugadorActual}`;
    } 
}
actualizarRonda = (ronda) => {
    const $ronda = document.querySelector('#ronda');
    $ronda.innerHTML = `${ronda}`;
} 
gameOver = () => {
    bloquearTablero();

    const estado = document.querySelector('#estado');
    estado.innerHTML = 'Perdiste, Lord Pekers has won again! You\'re loser.';
}