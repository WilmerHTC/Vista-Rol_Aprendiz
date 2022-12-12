/*Programacion de JavaScript*/

var piezas = document.getElementsByClassName('movil');

var tamWidh = [147,120,172,147,172,147,120,147,147,172,147,172,172,147,147,172,147,172,147,150,147,120,147,172,147,172,147,147];
var tamHeight = [147,120,172,147,172,147,150,150,150,172,147,172,172,147,147,175,147,172,147,150,147,120,147,172,147,172,147,147];

for(var i=0;i<piezas.length;i++){
	piezas[i].setAttribute("width", tamWidh[i]);
	piezas[i].setAttribute("height",tamHeight[i]);
	piezas[i].setAttribute("x", Math.floor((Math.random ()* 40) + 2));
	piezas[i].setAttribute("y", Math.floor((Math.random ()*  700) + 2));
	piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
}

var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
	elementSelect = reordenar(evt);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	currentPosx = parseFloat(elementSelect.getAttribute("x"));     
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moverElemento(evt)");
}

function moverElemento(evt){
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
	iman();
}

function deseleccionarElemento(evt){
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

var entorno = document.getElementById('entorno');

function reordenar(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

var origX = [248,362,450,577,679,819,931,249,349,451,579,680,794,905,248,336,450,565,692,791,905,248,334,449,576,677,817,917];   
var origY = [417,417,391,417,392,405,404,530,504,493,532,493,506,507,647,620,621,622,622,647,622,762,749,723,736,723,749,735];

function iman(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
var win = document.getElementById("win");

function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada = bien_ubicada + 1;
		}
	}

}

//Temporizador

const iniciarTemporizador = (minutos, segundos) => {
	ocultarElemento($contenedorInputs);
	mostrarElemento($btnPausar);
	ocultarElemento($btnIniciar);
	ocultarElemento($btnDetener);
	if (fechaFuturo) {
	  fechaFuturo = new Date(new Date().getTime() + diferenciaTemporal);
	  console.log("Reanudar con diferencia de " + diferenciaTemporal);
	  diferenciaTemporal = 0;
	} else {
	  console.log("Iniciar");
	  const milisegundos = (segundos + (minutos * 60)) * 1000;
	  fechaFuturo = new Date(new Date().getTime() + milisegundos);
	}
	clearInterval(idInterval);
	idInterval = setInterval(() => {
	  const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();
	  if (tiempoRestante <= 0) {
		console.log("Tiempo terminado");
		clearInterval(idInterval);
		sonido.play();
		ocultarElemento($btnPausar);
		mostrarElemento($btnDetener);
	  } else {
		$tiempoRestante.textContent = milisegundosAMinutosYSegundos(tiempoRestante);
	  }
	}, 50);
  };
  
  const pausarTemporizador = () => {
	ocultarElemento($btnPausar);
	mostrarElemento($btnIniciar);
	mostrarElemento($btnDetener);
	diferenciaTemporal = fechaFuturo.getTime() - new Date().getTime();
	clearInterval(idInterval);
  };
  
  const detenerTemporizador = () => {
	clearInterval(idInterval);
	fechaFuturo = null;
	diferenciaTemporal = 0;
	sonido.currentTime = 0;
	sonido.pause();
	$tiempoRestante.textContent = "00:00.0";
	init();
  };
  
  const agregarCeroSiEsNecesario = valor => {
	if (valor < 10) {
	  return "0" + valor;
	} else {
	  return "" + valor;
	}
  }
  const milisegundosAMinutosYSegundos = (milisegundos) => {
	const minutos = parseInt(milisegundos / 1000 / 60);
	milisegundos -= minutos * 60 * 1000;
	segundos = (milisegundos / 1000);
	return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
  };

