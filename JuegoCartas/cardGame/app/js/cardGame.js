class Carta {
    constructor(tipo, puntuacion, imgPath) {
        this.tipo = tipo;
        this.puntuacion = puntuacion;
        this.imgPath = imgPath;
    }

}

class Jugador {
    constructor(nombre, eliminado = false, turno = false) {
        this.nombre = nombre;
        this.cartasEnMano = [];
        this.eliminado = eliminado;
        this.turno = turno;
    }

    //funcion que añade una carta a la mano del jugador
    addCarta(carta) {
        this.cartasEnMano.push(carta);
    }

    //Funcion que suma los puntos de las cartas de puntos que tiene el jugador
    sumarPuntos() {
        let puntuacion = 0;
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            puntuacion += this.cartasEnMano[indice].puntuacion;
        }
        console.log(puntuacion);
        return puntuacion;
    }

    //funcion que devuelve cuantas cartas tiene el jugador
    cartasMano() {
        return this.cartasEnMano.length;
    }

    //funcion que devuelve cuantas cartas del tipo desactivacion tiene el jugador
    tipoDesactivacion() {
        let cartasDeDesactivacion = 0;
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            if (this.cartasEnMano[indice].tipo === "Desactivacion") {
                cartasDeDesactivacion++;
            }
        }
        console.log(cartasDeDesactivacion);
        return cartasDeDesactivacion;
    }

    //funcion que devuelve cuantas cartas del tipo saltar turno tiene el jugador
    tipoSaltarTurno() {
        let cartasDeSaltar = 0;
        let btnPasar = document.getElementById("btnPasar");
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            if (this.cartasEnMano[indice].tipo === "Saltar") {
                cartasDeSaltar++;
                botonPasar.disabled = false;
                btnPasar.setAttribute("class", "btnPasarTurnoEnabled");
            }else{
                botonPasar.disabled = true;
                btnPasar.setAttribute("class", "btnPasarTurnoDisabled");
            }
        }
        console.log(cartasDeSaltar);
        return cartasDeSaltar;
    }

    //funcion que elimina una carta de tipo saltar del array
    eliminarCartaSaltar() {
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            if (this.cartasEnMano[indice].tipo === "Saltar") {
                this.cartasEnMano.splice(indice, 1);
                indice = this.cartasEnMano.length;
            }
        }
    }

    //funcion que elimina una carta de tipo desactivacion del array
    eliminarCartaDesactivacion() {
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            if (this.cartasEnMano[indice].tipo === "Desactivacion") {
                this.cartasEnMano.splice(indice, 1);
                indice = this.cartasEnMano.length;
            }
        }
    }

    saltarTurno(jugadores, posicion) {
        jugadores[posicion].turno = false;
        if (posicion == jugadores.length - 1) {
            posicion = 0;
            jugadores[posicion].turno = true;
        } else {
            posicion++;
            jugadores[posicion].turno = true;
        }
    }

}

let jugadores = [];
let jugadorUno = new Jugador("Jugador 1", false, true);
let jugadorDos = new Jugador("Jugador 2", false, false);
let jugadorTres = new Jugador("Jugador 3", false, false);
jugadores.push(jugadorUno, jugadorDos, jugadorTres);
let contadorEliminados = 0;

class Baraja {
    constructor() {
        this.cartas = [];
    }

    //Funcion que llena la baraja de cartas
    llenarBaraja() {
        //creamos los contadores para controlar cuantas cartas hay de cada tipo en el array
        let contadorBombas = 0;
        let contadorDesactivacion = 0;
        let contadorSaltar = 0;
        let contadorPuntos = 0;

        //recorremos el array y vamos añadiendo las cartas
        while (this.cartas.length < 60) {
            if (contadorBombas < 6) {
                let nuevaCartaBomba = new Carta("Bomba", 0, "./img/bomba/bomba.png");
                this.cartas.push(nuevaCartaBomba);
                contadorBombas++;
            }
            if (contadorDesactivacion < 6) {
                let nuevaCartaDes = new Carta("Desactivacion", 0, "./img/herramienta/herramienta.png");
                this.cartas.push(nuevaCartaDes);
                contadorDesactivacion++;
            }
            if (contadorSaltar < 10) {
                let nuevaCartaSaltar = new Carta("Saltar", 0, "./img/pasarTurno/pasarTurno.png");
                this.cartas.push(nuevaCartaSaltar);
                contadorSaltar++;
            }
            let nuevaCartaPuntos = new Carta("Puntos", Math.trunc(Math.random() * 10) + 1, getRandomPathImg());
            this.cartas.push(nuevaCartaPuntos);
            contadorPuntos++;
        }

        //mostramos el contenido de la baraja
        for (let indice = 0; indice < this.cartas.length; indice++) {
            console.log(this.cartas[indice]);
        }
        console.log(this.cartas.length);
        console.log(contadorBombas);
        console.log(contadorDesactivacion);
        console.log(contadorSaltar);
        console.log(contadorPuntos);
    }
    //Funcion que mezcla las cartas de la baraja
    barajar() {
        for (let indice = this.cartas.length - 1; indice > 0; indice--) {
            let numeroAleatorio = Math.floor(Math.random() * (indice + 1));
            [this.cartas[indice], this.cartas[numeroAleatorio]] = [this.cartas[numeroAleatorio], this.cartas[indice]];
        }
        for (let indice = 0; indice < this.cartas.length; indice++) {
            console.log(this.cartas[indice]);
        }
    }

    eliminarCartaBaraja() {
        if (this.cartas.length > 0) {
            this.cartas.splice(0, 1);
        }
    }

    robarCarta() {
        //Buscamos con findIndex la posicion del jugador que tiene el turno a true
        let posicion = jugadores.findIndex(jugador => jugador.turno === true);
        if (posicion == -1) {
            posicion = 0;
        }

        //Comprobamos si el jugador actual esta eliminado
        if (jugadores[posicion].eliminado === true) {
            jugadores[posicion].turno = false;
            //Comprobamos el jugador eliminado es el de la ultima posicion y la ponemos a 0 para empezar de nuevo
            if (posicion == jugadores.length - 1) {
                posicion = 0;
            } else {
                posicion++;
            }
            jugadores[posicion].turno = true;
        }
        console.log("Es el turno " + posicion);

        let numeroCartasJ = document.getElementById(`J${posicion}NumCartas`);
        let puntosJ = document.getElementById(`J${posicion}Puntos`);
        let saltoJ = document.getElementById(`J${posicion}saltoTurno`);
        let desactivacionJ = document.getElementById(`J${posicion}Desactivacion`);
        let imagenCarta = document.getElementById("imgCartaRobada");


        if (this.cartas.length > 0) {
            //Obtenemos una carta de la baraja
            let cartaActual = this.cartas[0];
            imagenCarta.setAttribute("src", cartaActual.imgPath);
            //Añadimos una carta a la mano del jugador
            jugadores[posicion].addCarta(cartaActual);
            numeroCartasJ.textContent = "⚪️ Número de cartas: " + jugadores[posicion].cartasMano();

            //Se elimina la carta robada de la baraja
            this.eliminarCartaBaraja();
            //console.log(jugadores[0])
            console.log(cartaActual);

            //Comprobamos si la carta que se acaba de robar es una bomba
            if (cartaActual.tipo === "Bomba") {
                debugger;
                //En el caso de que sea una bomba miramos si tiene alguna carta de desactivacion,
                //si tiene se elimina la carta de bomba y se le quita una carta de desactivacion
                if (jugadores[posicion].tipoDesactivacion() > 0) {
                    //Eliminamos la ultima carta robada del array del jugador (que seria la bomba) y la carta de desactivacion
                    jugadores[posicion].cartasEnMano.splice(jugadores[posicion].cartasEnMano.length - 1, 1);
                    jugadores[posicion].eliminarCartaDesactivacion();
                    jugadores[posicion].tipoDesactivacion() - 1;
                    //Actualizamos los valores
                    numeroCartasJ.textContent = "⚪️ Número de cartas: " + jugadores[posicion].cartasMano();
                    desactivacionJ.textContent = "⚪️ Cartas desactivación:" + jugadores[posicion].tipoDesactivacion();
                    jugadores[posicion].turno = false;
                    if (posicion == jugadores.length - 1) {
                        posicion = 0;
                        jugadores[posicion].turno = true;
                    } else {
                        posicion++;
                        jugadores[posicion].turno = true;
                    }
                } else {
                    jugadores[posicion].eliminado = true;
                    jugadores[posicion].turno = false;
                    let titulo = document.getElementById(`J${posicion}Titulo`);
                    titulo.textContent = "ELIMINADO";
                    contadorEliminados++;
                    if (posicion == jugadores.length - 1) {
                        posicion = 0;
                        jugadores[posicion].turno = true;
                    } else {
                        posicion++;
                        jugadores[posicion].turno = true;
                    }
                }
            } else {
                puntosJ.textContent = "⚪️ Puntos totales:" + jugadores[posicion].sumarPuntos();
                desactivacionJ.textContent = "⚪️ Cartas desactivación:" + jugadores[posicion].tipoDesactivacion();
                saltoJ.textContent = "⚪️ Cartas salto turno:" + jugadores[posicion].tipoSaltarTurno();
                if (posicion < jugadores.length - 1) {
                    jugadores[posicion].turno = false;
                    jugadores[posicion + 1].turno = true;
                } else {
                    jugadores[0].turno = true;
                    jugadores[jugadores.length - 1].turno = false;
                }
            }
        } else {
            alert("Ya no quedan mas cartas");
        }

        if (contadorEliminados == jugadores.length - 1) {
            posicion = jugadores.findIndex(jugador => jugador.eliminado === false);
            alert("El ganador es " + jugadores[posicion].nombre);
        }

    }

}

let baraja = new Baraja();
function robarCartaBaraja() {
    baraja.robarCarta();
}



let botonRobar = document.getElementById("btnRobar");
let botonPasar = document.getElementById("btnPasar");
botonRobar.onclick = robarCartaBaraja;
//botonPasar.onclick = jugador.pasarTurno;
baraja.llenarBaraja();
baraja.barajar();
//baraja.robarCarta();


/*
Funcion que devuelve el path de una imagen
de robot de manera aleatoria
*/
function getRandomPathImg() {
    let random = Math.floor(Math.random() * 20) + 1;
    if (random < 10) {
        return `./img/card/robot_0${random}.png`;
    }
    return `./img/card/robot_${random}.png`;


}
