var joc ="escriu";
/**
  Event Listener para teclado
  @return void
*/

function tecla(evt) {
  if(!evt) {
    evt=event;
    codi=evt.keyCode;
  }
  else {
    codi=evt.which;
  }
  switch(codi) {
    case 8:
      parent.dibuix.escriu.borrarUlt();
    break;
    case 13:
      parent.dibuix.escriu.comprovar();
    break;
    default:
      var car=String.fromCharCode(codi);
      var trobat=cercaChar(lletres,car);
      if(trobat!=-1) {
	parent.dibuix.escriu.add(car);
      }
      break;
  }
  window.frames[1].focus();
}
/**
  Inicializa el eventListener para teclado de todos los frames
  @return void
*/
function eventos() {
	if(!window.event) {
	  window.captureEvents(Event.KEYPRESS);
	}
	for(i=0;i<window.frames.length;i++) {
		window.frames[i].document.onkeypress=tecla;
	} 
	window.frames[2].focus();
} 

//genera Matriz de caracteres para poder imprimir en pantalla vocales con acento
var array = new Array (5);
var vocals = new Array (224, 232, 236, 242, 249);

array[0] = new Array (7);
array[1] = new Array (5);
array[2] = new Array (5);
array[3] = new Array (6);
array[4] = new Array (5);
array[0][0] = "a";
array[1][0] = "e";
array[2][0] = "i";
array[3][0] = "o";
array[4][0] = "u";
for (j = 0; j < vocals.length; j++) {
  conta = vocals[j];
  for (i = 1; i < array[j].length; i++)
   {
    array[j][i] = String.fromCharCode (conta);
    conta++;
   }
}
/**
  Busca en la matriz de vocales el caracter pasado
  devuelve la vocal en su forma basica(sin acentos) o ese caracter si no esta en la matriz
  @param car caracter a buscar
  @return char

*/
function buscaChar (car) {
  var i, j;
  if(car.toLowerCase().charCodeAt(0)>=224) {
   for (i = 0; i < array.length; i++){
    for (j = 0; j < array[i].length; j++){
     if (car == array[i][j]){
      return array[i][0];
     }
    }
   }
  }
  else {
   return car;
  }
}

/**
  Elimina acentos a la palabra pasada
  @param paraula palabra a la que se le quitaran los acentos
  @return string
*/
function generate (paraula) {
  var i;
  var caracter;
  for (i = 0; i < paraula.length; i++){
    if (paraula.charCodeAt(i) >= 224) {
     caracter = buscaChar (paraula.charAt(i));
     paraula = paraula.substring (0, i) + caracter + paraula.substring (i + 1,paraula.length);
    }
   }

  return paraula;
}


//Objecte per l'exercici d'escriure lliurement
/**
  @class Clase para ejercicio de escribir libremente
  @constructor
  @param wordimg objeto WordImg 
  con las palabras,imagenes y sonido
  @param nomCapa contenedor donde se dibujar� y escribir�
  @param dirSo path a  los sonidos
  @param dirImg path a las imagenes
  @author Edgar Sanchez Cortes
  @version 0.1
  
*/
function Escriu (wordimg, nomCapa, dirSo, dirImg) {
  this.comprovar = comprovarEscriu;
/**
  conjunto de palabras,imagenes y sonidos que tendr� el ejercicio
  @type WordImg
*/
  this.paraules = wordimg;
  
  /**
    objeto capa donde se trabajar�
    @type HtmlLayer
  */
  this.capa = document.getElementById (nomCapa);
  /**
    path al directorio de los sonidos
    @type String
  */
  this.dirSo = dirSo;
  /**
    path al directorio de imagenes
    @type String
  */
  this.dirImg = dirImg;
  
  /**
    Indica si lo que esta tecleado se ha validado
    @type int
  */
  this.validate=0;
  
  this.putImg = putImg;
  this.putSound = putSound;
  this.add = add;
  this.borrarUlt = borrarUlt;
  this.actualitza = actualitza;
  this.escolta = escolta;
  /**
    Palabra anterior
    @type String
  */
  this.ant = "";
  this.continua = continuaEscriure;
  /**
    Caracter que har� de cursor
    @type String
  */
  this.cursor = "_";
  /**
    Palabra actual
    @type String
  */
  this.actual = "";
  this.init = continuaEscriure
  this.capa.innerHTML = this.cursor;
  this.putCursor = putCursor;
  this.borra=borrar;
}
/**
  Borra lo escrito en la pantalla
*/
function continuaEscriure ()
{
  this.borra ();
   this.actual="";
  this.validate=0;
}
/**
  Concatena el caracter pasado a la palabra actual
  @param car Caracter a concatenar
  @return void
*/
function add (car) {
  if (this.actual == "") {
   this.ant = "";
  }
  this.actual += car;
  this.actual = this.actual.toUpperCase ();
  this.capa.innerHTML = this.actual + this.putCursor ('black');
  this.validate=0;
}
/**
  Valida la palabra introducida
  @return void
*/
function comprovarEscriu () {
  this.validate=1;
  index=cerca(this.paraules,this.actual);
  this.capa.innerHTML="";
  if (index != -1) {
    paraula = this.paraules[index];
    this.putImg (this.dirImg+"/"+paraula.imatge);
    this.capa.innerHTML += "<br>" + this.paraules[index].paraula.toUpperCase();
    this.putSound (paraula.so);
    this.ant = this.actual;
    this.actual = "";
   }
  else {
    this.putImg ("imatges/error.gif");
    this.putSound ("so/error.wav");
    this.actual = "";
  }
}
/**
  Lanza el sonido correspondiente a la palabra correcta actual
  @type void
*/
function escolta () {
  text = this.ant;
  if(this.validate) {
  	this.capa.innerHTML="";
    index = cerca (this.paraules, text); 
    if (index == -1) {
     this.capa.innerHTML=this.putCursor("black");
    }
    else {
      this.putImg (this.dirImg+"/"+this.paraules[index].imatge);
      this.capa.innerHTML += "<br>" + this.paraules[index].paraula;
      this.putSound (this.paraules[index].so);
    }
  }
 

}

//Objecte per l'exercici de copia
/**
  @class Clase para ejercicio de copiar
  @param wordimg WordImg 
  con las imagenes y sonidos del ehercicio
  @param nomCapa nombre de la capa sobre la que se trabajar�
  @param dirSo path al direcorio de sonido
  @param dirIMg path al directorio de imagenes
  @param soBe path al sonido de correcto
  @param soMal path al sonido de incorrecto
  @param estil estilo a aplicar al cursor
  @constructor
  @version 0.1
  @author Edgar Sanchez Cortes
*/
function Copia (wordimg, nomCapa, dirSo, dirImg, soBe, soMal, estil)
{
  /** capa sobre la que se trabajar� 
    @type HtmlLayer
  */
  this.capa = (document.getElementById (nomCapa));
  /**
    Palabra actual introducida por el usuario
    @type String
  */
  this.actual = "";
  /**
    Array de objetos @see WordImg con las palabras,imagenes y sonidos para el ejercicio
  */
  this.paraules = wordimg;
  /**
    Directorio donde estan los sonidos
    @type String
  */
  this.dirSo = dirSo;
  /**
    Directorio donde estan las imagenes
    @type String
  */
  this.dirImg = dirImg;
  /**
    Cadena que representa el cursor
    @type String;
  */
  this.cursor = "_";
  /**
    Palabra correcta
  */
  this.correcte;
  /**
    Indice de la palabra actual
    @type int
  */
  this.wordActual = -1;
  /**
    Path al sonido de incorrecto
    @type String
  */
  this.soMal = soMal;
  /**
    Path al sonido de correcto
    @type String
  */
  this.soBe = soBe;
  /**
    Estilo a aplicar
    @type String
  */
  this.estil=estil;
  
  this.putImg = putImg;
  this.putSound = putSound;
  this.borrarUlt = borrarUlt;
  this.borrar = borrar;
  this.init = initCopia;
  this.escolta = escoltaCopia;
  this.actualitza = actualitzaCopia;
  this.getNewWord = getNewWord;
  this.add = addCopia;
  this.comprovar = comprovarCopia;
  this.continua = continuaCopia;
  this.putCursor = putCursor;
  this.control=control;
  this.init ();

}
/**
  A�ade un caracter a la palabra actual
  @type void
*/
function addCopia (car)
{
  var index = this.correcte.length;
  if(this.validate) {
   this.validate=0;
  }
  if (this.control(car))
   {
    this.actual += this.correcte.charAt(this.actual.length).toUpperCase();
    this.actual = this.actual.toUpperCase ();
    this.capa.innerHTML =insertTable (this.correcte + "&nbsp;",this.actual + this.putCursor ('black'), this.estil);
   }
  else
   {
    this.capa.innerHTML = insertTable (this.correcte + "&nbsp;",this.actual + this.putCursor ('red'), this.estil);
   }
}
function control(car) {
  correct=0;
  correcte=generate(this.correcte.toLowerCase());
  correcte=correcte.toLowerCase().charAt(this.actual.length).toUpperCase();
  if(car.toUpperCase()==correcte) {
    correct++;
  }
  return correct;
}
/**
  Metodo que selecciona otra palabra
  @return void
*/
function continuaCopia ()
{
  this.wordActual = this.getNewWord ();
  this.actual = "";
  this.init ();
}
/**
  Actualiza el valor introducido por el usuario
  @return void
*/
function actualitzaCopia ()
{
  this.capa.innerHTML =insertTable (this.correcte + "&nbsp;",this.actual + this.putCursor ('black'), this.estil);
}
/**
  Valida la palabra introducida por el usuario,muestra mensaje error/correcto
  Valida la palabra introducida por el usuario,muestra mensaje error/correcto
  @return void
*/
function comprovarCopia () {
  this.capa.innerHTML="";
  if (this.actual.toLowerCase()!=this.correcte.toLowerCase())
   {
    this.putImg("imatges/error.gif");
    this.putSound(this.soMal);
    this.actual = "";
   }
  else
   {
    this.putImg(this.dirImg + this.paraules[this.wordActual].imatge)
    this.putSound(this.paraules[this.wordActual].so);
    this.capa.innerHTML += "<br>" + this.actual;
    this.actual = "";
    this.validate=1;
   }
}
/**
  Inicializa el ejercicio de copia
  @return void
*/
function initCopia ()
{
  this.wordActual = this.getNewWord ();
  index = this.wordActual;
  this.correcte = this.paraules[this.wordActual].paraula;
  this.actual = "";
  tabla =insertTable (this.correcte + "&nbsp;",this.actual + this.putCursor ('black'), this.estil);
  this.capa.innerHTML = tabla;
  this.putSound (this.paraules[index].so);
  validate=0;
}
/**
  Si la palabra es validada muestra palabra e imagen y reproduce sonido si no 
  muestra palabra a copiar y reproduce sonido
  @return void
*/
function escoltaCopia () {
  if(this.validate) {
  this.capa.innerHTML="";
   this.putImg (this.dirImg+"/"+this.paraules[index].imatge);
   this.capa.innerHTML += "<br>" + this.correcte.toUpperCase();
   this.putSound (this.paraules[index].so);
  }
  else {
   tabla =insertTable (this.correcte + "&nbsp;",this.actual + this.putCursor ('black'), this.estil);
   this.capa.innerHTML = tabla;
   this.putSound (this.paraules[index].so);
  }
}
/**
  Crea 1 tabla donde se colocaran el valor correcto y el escrito por el usuario aplicandole 1 estilo
  @param correcte Palabra a copiar
  @param actual Palabra escrita por el usuario
  @param estil Estilo que aplicaremos a la tabla
  @return string
*/
function insertTable (correcte, actual, estil)
{
  var size = (correcte.length + 1) * 15;
  tabla ="<table class=" + estil + " width=" + size + "><tr><td>" + correcte +
    "</td></tr><tr><td>" + actual + "</td></tr></table>";
  return tabla;
}

//Objecte Pregunta
/**
  @class Clase para ejercicio de Pregunta(sale 1 imagen y hay que escribir que es
 @param wordimg WordImg 
  con las imagenes y sonidos del ehercicio
  @param nomCapa nombre de la capa sobre la que se trabajar�
  @param dirSo path al direcorio de sonido
  @param dirIMg path al directorio de imagenes
  @param soBe path al sonido de correcto
  @param soMal path al sonido de incorrecto
  @constructor
  
*/
function Pregunta (wordimg, nomCapa, dirSo, dirImg, soBe, soMal)
{
  /**
    Array con todos los WordImgs para el ejercicio
    @type @see WordImg
  */
  this.paraules = wordimg;
  /**
    Flag para comprobar si la palabra ha sido validada o no
    @private
    @type int;
  */
  this.validate=0;
  /**
    Palabra Correcta
    @type String
  */
  this.correcte;
  /**
      Caracter que representa al cursor
      @type string
  */
  this.cursor = "_";
  /**
    Indice de la palabra seleccionada del array de WordImgs
    @type int
  */
  this.wordActual = -1;
  /**
    Path al directorio de sonidos
    @type string
  */
  
  this.dirSo = dirSo;
  /**
    Path al directorio de imagenes
    @type string
  */
  this.dirImg = dirImg;
  /**
    Path al sonido de incorrecto
    @type string
  */
  this.soMal = soMal;
  /**
    Path al sonido de correcto
    @type string
  */
  this.soBe = soBe;
  /**
    Capa sobre la que se trabajar�
    @type HtmlLayer
  */
  this.capa = (document.getElementById (nomCapa));
  /**
    Palabra introducida por el usuario
    @type String
  */
  this.actual = "" ;
  
  this.putImg = putImg;
  this.putSound = putSound;
  this.borrarUlt = borrarUlt;
  this.borrar = borrar;
  this.init = initPregunta;
  this.escolta = escoltaPregunta;
  this.actualitza = actualitzaPregunta;
  this.getNewWord = getNewWord;
  this.add = addPregunta;
  this.comprovar = comprovarPregunta;
  this.continua = continuaPregunta;
  this.putCursor = putCursor;
  this.control=control;
  
  this.init ();
}
/**
  inicializa el Ejercicio
  @return void
*/
function initPregunta ()
{
  this.wordActual = this.getNewWord ();
  index = this.wordActual;
  this.correcte = this.paraules[this.wordActual].paraula;
  this.actual = "";
  this.capa.innerHTML="";
  this.putImg (this.dirImg+"/"+this.paraules[index].imatge) ;
  this.capa.innerHTML +=  "<br>";
  this.capa.innerHTML +=this.putCursor ('black');
  this.putSound (this.paraules[index].so);
  this.validate=0;
}
/**
  Concatena un caracter a la palabra que est� formando el usuario
  @param car Caracter a concatenar
  @return void
*/
function addPregunta (car)
{
  this.validate=0;
  var index = this.correcte.length;
  if(this.control(car)) {
    this.actual += this.correcte.charAt(this.actual.length).toUpperCase();
    this.actual = this.actual.toUpperCase ();
    this.actualitza ("black");
   }
  else {
      this.actualitza("red");
  }
  
}
/**
  Si la palabra esta validada muestra palabra e imagen y reproduce sonido si no 
  muestra palabra a copiar y reproduce sonido
  @return void
*/
function escoltaPregunta ()
{
  if(this.validate) {
    this.capa.innerHTML="";
    this.putImg (this.dirImg+"/"+this.paraules[index].imatge);
    this.capa.innerHTML+="<br>"+this.paraules[index].paraula.toUpperCase();
    this.putSound (this.paraules[index].so);
  }
  else {
    this.capa.innerHTML =  ""
    this.putImg (this.dirImg+"/"+this.paraules[index].imatge);
    this.putSound (this.paraules[index].so);
    this.capa.innerHTML += "<br>" + this.actual+this.putCursor ('black');
  }
}
/**
  Valida la palabra introducida y muestra mensaje e imagen correspondiente
  @return void
*/
function comprovarPregunta () {
  this.capa.innerHTML="";
  if (this.actual.toUpperCase() != this.correcte.toUpperCase()) {
    this.putImg("imatges/error.gif")
    this.putSound(this.soMal);
    this.actual = "";
   }
  else
   {
    this.validate=1;
    this.putImg(this.dirImg + this.paraules[this.wordActual].imatge)
    this.putSound(this.paraules[this.wordActual].so);
    this.capa.innerHTML += "<br>" + this.paraules[this.wordActual].paraula.toUpperCase();
    this.actual = "";
   }
}
/**
  Actualiza la palabra mostrada
  @param color Color del cursor despues de actualizar
  @return void
*/
function actualitzaPregunta (color) {
  index = this.wordActual;
  this.capa.innerHTML="";
  this.putImg (this.dirImg+"/"+this.paraules[index].imatge);
  this.capa.innerHTML += "<br> "+this.actual + this.putCursor (color);
}
/**
  Cambia la palabra seleccionada para el ejercicio
  @return void
*/
function continuaPregunta () {
  this.wordActual = this.getNewWord ();
  this.actual = "";
  this.init ();
}
/**
  Genera la cadena para escribir el cursor
  @param color Color del cursor en formato rgb o cadena('red','white',...)
  @return String
*/
function putCursor (color)  {
  return "<font color='" + color + "'>" + this.cursor + "</font>";
}
/**
  @class Clase para los ejercicios de tipo dictado
  @constructor
  @param wordimg WordImg 
  con las imagenes y sonidos del ehercicio
  @param nomCapa nombre de la capa sobre la que se trabajar�
  @param dirSo path al direcorio de sonido
  @param dirIMg path al directorio de imagenes
  @param soBe path al sonido de correcto
  @param soMal path al sonido de incorrecto
 
*/
function Dictat (wordimg, nomCapa, dirSo, dirImg, soBe, soMal)
{
  
/**
    Array con todos los WordImgs para el ejercicio
    @type @see WordImg
*/
  this.paraules = wordimg;
/**
  Capa sobre la que se trabajar�
  @type HtmlLayer
*/
 this.capa = (document.getElementById (nomCapa));
  /**
    Path al directorio de sonidos
    @type string
  */
  this.dirSo = dirSo;
  /**
    Path al directorio de imagenes
    @type string
  */
  this.dirImg = dirImg;
  /**
    Palabra introducida por el usuario
    @type String
  */
  this.actual = "";
  /**
    Path al sonido de incorrecto
    @type string
  */
  this.soMal = soMal;
  /**
    Path al sonido de correcto
    @type string
  */
  this.soBe = soBe;
  /**
    Indice de la palabra seleccionada del array de WordImgs
    @type int
  */
  this.wordActual = -1;
  /**
    Palabra correcta
    @type String
  */
  this.correcte;
  /**
      Caracter que representa al cursor
      @type string
  */
  this.cursor = "_";
  /**
    Flag que indica que la palabra ha sido validada
    @type int
  */
  this.validate=0;
  
  this.putImg = putImg;
  this.putSound = putSound;
  this.borrarUlt = borrarUlt;
  this.borrar = borrar;
  this.init = initDictat;
  this.escolta = escoltaDictat;
  this.actualitza = actualitzaDictat;
  this.getNewWord = getNewWord;
  this.add = addDictat;
  this.comprovar = comprovarDictat;
  this.continua = continuaDictat;
  this.putCursor = putCursor;
  this.control=control;
  this.init ();

}
/**
  Inicializa el dictado
  @return void
*/
function initDictat () {
  this.wordActual = this.getNewWord();
  index = this.wordActual;
  this.correcte = this.paraules[this.wordActual].paraula;
  this.actual = "";
  this.capa.innerHTML=this.putCursor ('black');
  this.putSound (this.paraules[index].so);
  
  this.validate=0;
}
/**
  A�ade un caracter a la palabra que est� formando el usuario
  @return void
*/
function addDictat (car) {
  this.validate=0;
  if(this.control(car)) {
    this.actual += this.correcte.charAt(this.actual.length).toUpperCase();
    this.actual = this.actual.toUpperCase ();
    this.actualitza ("black");
   }
  else {
      this.actualitza("red");
  }
  
}
/**
   Si la palabra esta validada muestra palabra e imagen y reproduce sonido si no 
  muestra palabra a copiar y reproduce sonido
  @return void
*/
function escoltaDictat () {
  this.capa.innerHTML="";
  if(!this.validate) {
   this.putSound (this.paraules[this.wordActual].so);
   this.capa.innerHTML += this.actual+this.putCursor ('black');
  }
  else {
   this.putSound(this.paraules[this.wordActual].so);
   this.putImg(this.dirImg + this.paraules[this.wordActual].imatge);
   this.capa.innerHTML += "<br>" + this.paraules[this.wordActual].paraula.toUpperCase();
   this.actual = "";
  }
}
/**
  Comprueba la palabra introducida y muestra error o muestra la imagen y la palabra y reproduce el sonido
  @return void
*/
function comprovarDictat () {
  this.capa.innerHTML="";
  if (this.actual.toLowerCase() !=this.correcte.toLowerCase()) {
     this.putImg("imatges/error.gif");
     this.putSound(this.soMal);
     this.actual = "";
  }
  else
   {
    this.putImg(this.dirImg + this.paraules[this.wordActual].imatge);
    this.putSound(this.paraules[this.wordActual].so);
    this.actual = "";
    this.capa.innerHTML += "<br>" + this.paraules[this.wordActual].paraula.toUpperCase();
    this.actual = "";
    this.validate=1;
   }
}
/**
  Actualiza la palabra introducida por el usuario
  @param color Color del cursor despues de actualizar
  @return void
*/
function actualitzaDictat (color)
{
  this.capa.innerHTML = this.actual + this.putCursor (color);
}
/**
  Selecciona otra palabra para el ejercicio
  @return void
*/
function continuaDictat ()
{
  this.wordActual = this.getNewWord ();
  this.actual = "";
  this.init ();
}
/**
  Obtiene el indice de un nuevo WordIMg
  @return int
*/
function getNewWord ()
{
  var res = this.wordActual;
  while (this.wordActual == res) {
    res = rand (this.paraules.length - 1);
   }
  return res;
}
/**
  Actualiza la palabra escrita por el usuario
*/

function actualitza ()
{
  this.capa.innerHTML = this.actual + this.putCursor ('black');
}
/**
  Elimina el ultimo caracter de la palabra que ha escrito el usuario
  @return void
*/
function borrarUlt ()
{
  var cad = this.actual;
  if (cad.length > 0)
   {
    this.actual = cad.substring (0, cad.length - 1);
   }
  this.actualitza ("black");
}
/**
  Borra todo lo que ha escrito el usuario
  @return void
*/
function borrar () {
  this.capa.innerHTML = "" + this.putCursor ('black');
}
/**
  Inserta un sonido en la capa donde se trabaja
  @param so sonido que se quiere insertar tiene que ser .wav
  @return void
*/
function putSound(so) {
//    console.log('puSound');
//    obj=document.createElement("embed");
//    obj.setAttribute("src",so);
//    obj.setAttribute("type","audio/wav");
//    this.capa.appendChild(obj);
//    return;
  
    obj=document.createElement("embed");
    obj.setAttribute("src",so);
    obj.setAttribute("type","audio/wav");
    obj.setAttribute("id","so");
    obj.setAttribute("width",1);
    obj.setAttribute("height",1);  
    obj.setAttribute("autostart","true");
    /*
    flag=getMime("audio/wav");
    if(flag==0) {
      alert("Es necessita el quicktime o qualsevol altre plugin per poder escoltar els sons");
      plugin=window.open("http://www.apple.com/quicktime/download/");
      plugin.focus();
    }
    */
    this.capa.appendChild(obj);
   
  }
/**
  Inserta una imagen en la capa donde se trabaja
  @param img path a la imagen a insertar
  @return void
  
*/
function putImg (img) {
  obj=document.createElement("img");
  obj.src=img;
  obj.width=300;
  obj.height=300;
  this.capa.appendChild(obj);
}
/**
  @class Clase que guarda la palabra,imagen y sonido
  @constructor
  @param paraula palabra del wordImg 
  @param imatge nombre de la imagen
  @param so nombre del sonido
  @author Edgar Sanchez Cortes
  @version 0.1

*/

function WordImg (paraula, imatge, so)
{
/**
  palabra del wordImg
  @type String
*/
  this.paraula = paraula;
/**
  Nombre de la imagen
  @type String
*/
  this.imatge = imatge;
/**
  nombre del sonido
  @type String
*/
  this.so = so.toLowerCase();
}
/**
  Obtiene una subcadena a partir de una cadena y una marca de inicio y otra de fin
  @param marcaInit marca inicio de subcadena
  @param maracaFi marca fin de subcadena
  @param cadena de la que se quiere obtener la subcadena
  @return String 
*/
function getCadena (marcaInit, marcaFi, cadena)
{
  var ultimChar;
  init = cadena.indexOf (marcaInit) + 1;
  end = cadena.indexOf (marcaFi, init);
  cadena = cadena.substring (init, end);
  ultimChar = cadena.length - 1;
  if (cadena[ultimChar] == '@')
   {
    cadena = cadena.substring (0, ultimChar);
   }

  return cadena;
}
/**
  Genera un WordImg a partir de una cadena y una marca
  @param cadena cadena de la que se quiere obtener el @see WordImg WordImg
  @param marca marca con la que dividir la cadena
  @return @see WordImg 
*/
function getWordImg (cadena, marca)
{
  var imatge;
  var word;
  var ParaulaImatge;
  var posMarca = cadena.indexOf (marca);
  word = cadena.substring (0, posMarca);
  imatge = cadena.substring (posMarca + 1, cadena.length);
  ParaulaImatge = new WordImg (word.toUpperCase(), imatge, "so/" + generate(word) + ".wav");
  return ParaulaImatge;
}

//obte l'array amb les paraules i imatges de la cadena passada
/**
  Genera Array con los WordImg obtenidos a partir de la cadena pasada
  @param Cadena Cadena formateada con los distintos WordImg
  @return @see WordImg
*/
function initMedia (Cadena)
{
   var init = 0;
  var resultat = new Array ();
  var paraulaImatge;
  var fi = Cadena.length;
  tmp = Cadena;
  var paraules = new Array ();
  var paraula;
  first = 0;
  if (fi != init) {
    do {
      if (tmp.length >= 1) {
        cadena = getCadena ('@', '@', tmp);
	paraulaImatge = getWordImg (cadena, '#');
	resultat.push (paraulaImatge);
      }
      init = tmp.indexOf ('@', 1);
      tmp = tmp.substring (init, fi);
    }
    while (init != (-1) && !(tmp.length <= 1));
   }
  resultat = ordenarWordImg (resultat);
  return resultat;
}


//obte la paraula mes petita de l'array a partir del inici passat
/**
  Obtiene la posicion de 
  la palabra mas peque�a de la lista de @see WordImg a partir de la posicion indicada
  @param array Array de @see WordImg
  @param init posicion a partir de la que se empieza a buscar
  @return int
  
*/
function minimWordImg (array, init)
{
  var minim;
  minim = array[init].paraula;
  var i;
  var index = init;
  for (i = init + 1; i < (array.length); i++)
   {
    if (array[i].paraula < minim)
     {
      minim = array[i].paraula;
      index = i;
     }
   }
  return index;
}

//ordena les paraules
/**
  Ordena alfabeticament el array de @see WordImg por palabras
  @param array Array con los WordImg a ordenar
  

*/
function ordenarWordImg (array)
{
  var tmp;
  var dest;
  for (i = 0; i < array.length; i++)
   {
    dest = minimWordImg (array, i);
    tmp = array[i];
    array[i] = array[dest];
    array[dest] = tmp;
   }
  return array;
}

//cerca en un array l'element passat
/**
  Busca una cadena en un array de cadenas
*/
function cerca(array,elem) {
  var result=-1;
  var flag=1;
  for(i=0;i<array.length&&flag;i++) {
   if(generate(array[i].paraula.toLowerCase())==elem.toLowerCase()) {
    result=i;
    flag=0;
			
   }
  }	
  return result;
}
/**
  Hace una busqueda secuencial del elemento elem en array
  Devuelve la posicion del elemento si esta en el array si no devuelve -1
  @param array Array donde estan todos los elementos 
  @param elem elemento a buscar
  @return int
*/
function cercaChar(array,elem) {
  var i;
  var result=-1;
  var flag=1;
  for(i=0;i<array.length&&flag;i++) {
    if(array[i]==elem) {
      result=i;
      flag=0;
    }
  }
  return result;
}

/**
  Realiza una busqueda binaria de elem en array
  Devuelve la posicion del elemento si esta en el array si no devuelve -1
  @param array Array donde estan todos los elementos ordenados
  @param elem elemento a buscar
  @return int
*/
function cercaBinaria (array, elem)
{
  var inici = 0;
  var fi = array.length - 1;
  var trobat = false;
  var mig;

  while (inici <= fi && !trobat)
   {
    var mig = parseInt ((fi + inici) / 2);

    if (generate(array[mig].paraula.toLowerCase()) == elem.toLowerCase()) {
     trobat = true;
    }
    else
     {
      if (array[mig].paraula.toLowerCase() < elem.toLowerCase()) {
       inici = mig + 1;
      }
      else {
       fi = mig - 1;
      }
     }
   }
  if (trobat)
   {
    return mig;
   }
  else
   {
    return -1;
   }
}

//*****************************************************************
//
//         Random Number Generator
//
//   by Tim Wallace   (timothy@essex1.com)
//
//   Original generator by Paul Houle  (ph18@cornell.edu)
//
//****************************************************************


// Random number generating function.
/**
     Random Number Generator
     by Tim Wallace   (timothy@essex1.com)
     Original generator by Paul Houle  (ph18@cornell.edu)
    @param number semilla para generar el numoer aletario
    @return int
*/
function rand (number)
{
  today = new Date ();
  jran = today.getTime ();
  ia = 9301;
  ic = 49297;
  im = 233280;
  jran = (jran * ia + ic) % im;
  return Math.ceil ((jran / (im * 1.0)) * number);
}

/**
  genera una tabla en el contenedor indicado
  @param lloc id del objeto que contendra la tabla
  @param name id de la nueva tabla
  @param fila numero de filas de la tabla
  @param col numero de columnas de la tabla
  @type void
*/

function generateTable(lloc,name,fila,col) {
  div=document.getElementById(lloc);
  cadena='<table id="'+name+'">\n\t';
  for(i=0;i<fila;i++) {
   cadena+="<tr>\n\t";
   for(j=0;j<col;j++) {
    cadena+="<td>\n\t";
    cadena+="</td>\n\t";
   }
   cadena+="</tr>\n\t";
  }
  cadena+="</table>";
  div.innerHTML=cadena;

}

/**
  rellena una tabla con las imagenes de un objeto @see WordImg
  @param wordImg objeto WordImg con las imagenes
  @param nomTabla nombre de la tabla a rellenar
  @param dirImg directorio de las imagenes
  @type void
*/

function generateChart(wordImg,nomTabla,dirImg) {
  tabla=document.getElementById(nomTabla);
  j=0;
  filas=tabla.rows.length;
  index=0;
  for(i=0;i<filas;i++) { 
   cols=tabla.rows[i].cells.length;
   for(j=0;j<cols;j++) {
    if(index<wordImg.length) {
     	actual=tabla.rows[i].cells[j];
     	actual.align="center";
     	actual.innerHTML="<img src="+dirImg+"/"+wordImg[index].imatge+" height=72 width=72>";
     	actual.innerHTML+="<br><br>"+wordImg[index].paraula;
     	index++;
    }
   }
  }
}
function getMime(mime) {
  var res=0;
  if(navigator.mimeTypes==null || navigator.mimeTypes.length==0) {
  	res=-1;
  }
  else { 
  	for(i=0;i<navigator.mimeTypes.length&&!res;i++) {
      if(navigator.mimeTypes[i].type==mime) {
        res=1;
      }
    }
  }
  return res;
}