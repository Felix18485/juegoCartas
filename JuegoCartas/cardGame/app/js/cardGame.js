class Carta {
    constructor(tipo, puntuacion) {
        this.tipo = tipo;
        this.puntuacion = puntuacion;
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
        let cartaPunto = new Carta("Puntos", 5);
        let cartaPunto2 = new Carta("Puntos", 10);
        let cartaDesac = new Carta("Desactivacion", 0);
        let cartaSalta = new Carta("Saltar", 0);
        this.cartasEnMano.push(cartaPunto);
        this.cartasEnMano.push(cartaDesac);
        this.cartasEnMano.push(cartaPunto2);
        this.cartasEnMano.push(cartaSalta);
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
        let cartaPunto = new Carta("Puntos", 5);
        let cartaPunto2 = new Carta("Puntos", 10);
        let cartaDesac = new Carta("Desactivacion", 0);
        let cartaSalta = new Carta("Saltar", 0);
        this.cartasEnMano.push(cartaPunto);
        this.cartasEnMano.push(cartaDesac);
        this.cartasEnMano.push(cartaPunto2);
        this.cartasEnMano.push(cartaSalta);
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
        let cartaPunto = new Carta("Puntos", 5);
        let cartaPunto2 = new Carta("Puntos", 10);
        let cartaDesac = new Carta("Desactivacion", 0);
        let cartaSalta = new Carta("Saltar", 0);
        this.cartasEnMano.push(cartaPunto);
        this.cartasEnMano.push(cartaDesac);
        this.cartasEnMano.push(cartaPunto2);
        this.cartasEnMano.push(cartaSalta);
        let cartasDeSaltar = 0;
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            if (this.cartasEnMano[indice].tipo === "Saltar") {
                cartasDeSaltar++;
            }
        }
        console.log(cartasDeSaltar);
        return cartasDeSaltar;
    }

    //funcion que elimina una carta del array
    eliminarCarta() {
        for (let indice = 0; indice < this.cartasEnMano.length; indice++) {
            if (this.cartasEnMano[indice].tipo === "Saltar") {
                this.cartasEnMano.splice(indice, 1);
            }
            if (this.cartasEnMano[indice].tipo === "Desactivacion") {
                this.cartasEnMano.splice(indice, 1);
            }
        }
    }

}


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
                let nuevaCartaBomba = new Carta("Bomba", 0);
                this.cartas.push(nuevaCartaBomba);
                contadorBombas++;
            }
            if (contadorDesactivacion < 6) {
                let nuevaCartaDes = new Carta("Desactivacion", 0);
                this.cartas.push(nuevaCartaDes);
                contadorDesactivacion++;
            }
            if (contadorSaltar < 10) {
                let nuevaCartaSaltar = new Carta("Saltar", 0);
                this.cartas.push(nuevaCartaSaltar);
                contadorSaltar++;
            }
            let nuevaCartaPuntos = new Carta("Puntos", Math.trunc(Math.random() * 10) + 1);
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
        for (let indice = 0; indice < this.cartas.length; indice++) {
            this.cartas.splice(indice, 1);
        }
    }

}
let baraja = new Baraja();
let jugador = new Jugador();

jugador.tipoSaltarTurno();
//jugador.tipoDesactivacion();
//jugador.sumarPuntos();
baraja.llenarBaraja();
baraja.barajar();






















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
