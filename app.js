// query.Selector permite acceder a cada uno de los elemenos del archivo HTML, usa parametros por se lleva parentesis
// al agregarle let se asigna una variable. practicamente el document sirve como puente entre JS Y HTML
// innerHTML sirve para asignar el texto desde javascript, o practicamente cambiar el valor que contenga en html
let numeroSecreto = 0;
let numeroDeIntentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;

function asignarElementoTexto(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
  // La funcion de asignarTextoElemento sirve para que la funcion quede disponible a lo largo
  // de todo el codigo, para reducirlo.
}
// las funciones sirve tambien para crear eventos, y TODOS los eventos en html comienzan con el prefijo ON
function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
  if (numeroDeUsuario === numeroSecreto) {
    asignarElementoTexto(
      'p',
      `Acertaste el numero en ${numeroDeIntentos} ${
        numeroDeIntentos === 1 ? 'intento' : 'intentos'
      }`
    );
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // el usuario no acerto
    if (numeroDeUsuario > numeroSecreto) {
      asignarElementoTexto('p', 'El numero es menor');
    } else {
      asignarElementoTexto('p', 'El numero es mayor');
    }
    numeroDeIntentos++;
    limpiarCaja();
  }
  return;
}

function limpiarCaja() {
  document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  console.log(numeroGenerado);
  console.log(listaNumeroSorteados);
  // Si a sorteamos todos os numeros
  if (listaNumeroSorteados.length == numeroMaximo) {
    asignarElementoTexto('p', 'Ya se sortearon todos los numeros posibles');
  } else {
    // si el numero generado esta incluio en la lista
    if (listaNumeroSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumeroSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}
function condicionesIniciales() {
  asignarElementoTexto('h1', 'Juego del numero secreto');
  asignarElementoTexto('p', `Indica un numero del 1 al ${numeroMaximo}:`);
  numeroSecreto = generarNumeroSecreto();
  numeroDeIntentos = 1;
}
function reiniciarJuego() {
  // limpiar la caja
  limpiarCaja();
  // indicar mensaje de intervalo de numeros
  // generar numero aleatorio
  // inicializar el numero de intentos
  condicionesIniciales();
  // desabilitar la caja de nuevo juego
  document.getElementById('reiniciar').setAttribute('disabled', true);
}

condicionesIniciales();
