let userNick = '';

document.querySelector('#submit').onclick = function (event) {
    event.preventDefault();
    userNick = document.querySelector('#user-nick').value;
    return userNick;
}

const $boton = document.querySelector('#boton');
let claseBoton = $boton.className;
// console.log(claseBoton.split('-sm')[0]);

$boton.onmouseover = function (event) {
    setTimeout(() => {
        cambiarClase(claseBoton);
        cambiarInnerHTML('Play');
    }, 2000);
    let claseTemporal = claseBoton.concat(' shadow');
    cambiarClase(claseTemporal);
    cambiarInnerHTML('Now!');
}

function cambiarClase(clase) {
    $boton.className = clase;
}

function cambiarInnerHTML(string) {
    $boton.innerHTML = `${string}`;
}

// export {userNick};