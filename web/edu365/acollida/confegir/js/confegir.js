//**************** variables generals
  var paraules=""; <!-- vocabulari -->
  var texto="";	<!-- text escrit -->
  var resp="";<!-- resposta -->
  var so="";<!-- arxiu de so a executar -->
  var fons="";<!-- text i dibuixo a presentar en el fons -->
  var f_e="";<!-- funcio a executar per l'explorer --> 
  var MiPrimerObjeto=parent.dibuix; 
  var lletres=new Array();
  var n=0;
  var n=1; 
  var directori="";
  var ultima_lletrae=0;
  var ok =0; 
 lletres[0]='';
 navegador = navigator.appName;
 versio = navigator.appVersion;

//**************** fianl variables generals

//************************
//imprimeix la pantalla
//************************

function imprimir()  
{
 
 MiPrimerObjeto.print();
 
}

function act_dir(nom)  
{
 directori=nom;
 //alert(parent.joc);
 if (parent.joc=="blanc")
 { blanc();
  }
 if (parent.joc=="preguntar")
  {  //alert('0');
    blanc();
    cerca_par();
  }
 if (parent.joc=="copiar_par")
  { 
    //alert('1');
    blanc();
    copia_par();

  }


 if (parent.joc =="cercar_veu")
  { 
    //alert('2');
    blanc();
    cerca_veu();

  }


}

//************************
//esborra la pantalla
//************************
function blanc()
{
	texto="";
	so="";
	fons="";
	resp="";
	if(navegador!="Netscape")
	{
	f_e='blanc';
	MiPrimerObjeto.location='../codi/blanc_e.htm';
	
	}
	else 
	{
	MiPrimerObjeto.document.clear();
	MiPrimerObjeto.document.write("<BR>");
	}
}

//************************
//Prepara la pregunta
//************************

function copia_par()
{

	texto=""	
	var str2=paraules.slice(paraules.length*Math.random());
	var t=str2.search('@');
	if (t==0)
	{ str2=paraules;
	  var t=str2.search('@');
	}
	var str2=str2.slice(t+1);
	var t=str2.search('#');
	resp=str2.substring(0,t);
	var n=str2.search('@');
	dibu='dib/'+str2.substring(t+1,n);
	so='so/'+resp.toLowerCase()+".wav";
	fons="<CENTER><H1><B>"+ resp +"</B></H1></CENTER><BR>"
        
	if(navegador!="Netscape")
	  { 
	   f_e="pregunta";
	   MiPrimerObjeto.location='../codi/blanc_e.htm';
	  }
	  else
	  {   
	  MiPrimerObjeto.document.clear();
	  MiPrimerObjeto.document.write(fons+"<EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
          }  

}

function cerca_veu()
{
	texto=""	
	var str2=paraules.slice(paraules.length*Math.random());
	var t=str2.search('@');
	if (t==0)
	{ str2=paraules;
	  var t=str2.search('@');
	}
	var str2=str2.slice(t+1);
	var t=str2.search('#');
	resp=str2.substring(0,t);
	var n=str2.search('@');
	dibu='dib/'+str2.substring(t+1,n);
	so='so/'+resp.toLowerCase()+".wav";
	fons="";

	if(navegador!="Netscape")
	  { 
	   f_e="pregunta";
	   MiPrimerObjeto.location='../codi/blanc_e.htm';
	  }
	  else
	  {   
	  MiPrimerObjeto.document.clear();
	  MiPrimerObjeto.document.write(fons+"<EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");

	}
}
function cerca_par()
{
	texto=""	
	var str2=paraules.slice(paraules.length*Math.random());
	var t=str2.search('@');
	if (t==0)
	{ str2=paraules;
	  var t=str2.search('@');
	}
	var str2=str2.slice(t+1);
	var t=str2.search('#');
	resp=str2.substring(0,t);
	var n=str2.search('@');
	dibu='dib/'+str2.substring(t+1,n);
	so='so/'+resp.toLowerCase()+".wav";
	fons="<CENTER><H1><B>"+texto+"</B></H1></CENTER><BR><CENTER><H1><B> <IMG SRC = "+directori+dibu+" width=300 height=300></B></H1></CENTER>"

	if(navegador!="Netscape")
	  { 
	   f_e="pregunta";
	   MiPrimerObjeto.location='../codi/blanc_e.htm';
	  }
	  else
	  {   
	  MiPrimerObjeto.document.clear();
	  MiPrimerObjeto.document.write(fons+"<EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
  }  
}
//************************
//altaveu
//************************
function altaveu()
{	
	if(navegador!="Netscape")
	  { 
	   f_e="altaveu";
	   MiPrimerObjeto.location='../codi/blanc_e.htm';
	  }
	  else
	  {   
	  MiPrimerObjeto.document.clear();
	  MiPrimerObjeto.document.write(fons+"<EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
  }  

}

//************************
//esborra una lletra
//************************
function esborra_par()
{
   t=texto.substring(0,ultima_lletra);
   texto =t;
   if(navegador!="Netscape")
    {
    	f_e='acumula';
    	MiPrimerObjeto.location='../codi/blanc_e.htm';
    }
    else 
    {
      MiPrimerObjeto.document.clear();
	  MiPrimerObjeto.document.write (fons);	
  	  MiPrimerObjeto.document.write ("<CENTER><H1><B>"+texto+"</B></H1></CENTER>");
  }
}
function esborra() {
	var longitud=texto.length;
	alert(texto);
	texto=texto.substring(0,longitud-1);
	if(navegador!="Netscape") {
		f_e='acumula';
  		MiPrimerObjeto.location='../codi/blanc_e.htm';
	}
  	else {
		MiPrimerObjeto.document.clear();
		MiPrimerObjeto.document.write (fons);
		if (longitud>1) {
			MiPrimerObjeto.document.write ("<CENTER><H1><B>"+texto+"</B></H1></CENTER>"); 
		}
		else { 
			MiPrimerObjeto.document.write("<BR>"); 
		}	
  	}	
}

//************************
//comprova els resultats
//************************
function validar()
{
   //ok=1; 
	if (resp!="") {// amb pregunta
		if (texto==resp) {
	      /* MiPrimerObjeto.document.write(" <EMBED    SRC="+directori+"so/moltbe.wav    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
	      resp="";
	      fons="";
	      texto="";    */
	      f_e="valida";
	      MiPrimerObjeto.location='../codi/blanc_e.htm';
	    }
	  /*	else {
				MiPrimerObjeto.document.write(" <EMBED    SRC="+directori+"so/mal.wav    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
		}*/
	  }
  else {// sense pregunta
		var t='@'+texto+'#';
		a=paraules.search(t);
		if (a!=-1) {
		   a=a+1;
		   tmp=paraules.substring(a, paraules.length);
		   b=tmp.search('#');
		   c=tmp.search('@')
		   kk=tmp.substring(b+1,c);
		   dibu='dib/'+kk;
		   so='so/'+texto.toLowerCase()+".wav";
		}
		else {
			dibu="error.gif";
			so=	"so/error.wav";
		  }
		  if(navegador!="Netscape") { 
			f_e="valida";
		   	MiPrimerObjeto.location='../codi/blanc_e.htm';
		  }
		  else {   
		  	MiPrimerObjeto.document.clear();
		  	MiPrimerObjeto.document.write("<HEAD><TITLE>Una nueva ventana</TITLE></HEAD>");
		  	MiPrimerObjeto.document.write("<CENTER><H1><B>"+texto+"</B></H1></CENTER>");
		  	MiPrimerObjeto.document.write("<CENTER><H1><B> <IMG SRC = "+dibu+" width=300 height=300></B></H1></CENTER>"); 
		  	MiPrimerObjeto.document.write(" <EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>"); 
		  //texto="";    
		  }  
	   	}
}  
//************************
//acumula en pantalla les lletres escrites
//************************ 
  function acumula(nom) 
  {
         /* if(ok ==1)
          
          { ok=0;
            blanc();
          
          }
	 */
	 ultima_lletra=texto.length;
	  texto=texto+nom;
	  if(navegador!="Netscape") { 
	    f_e="acumula";
	    MiPrimerObjeto.location='../codi/blanc_e.htm';
	  }
	  MiPrimerObjeto.document.clear();
	  MiPrimerObjeto.document.write (fons);	
	  MiPrimerObjeto.document.write ("<CENTER><H1><B>"+texto+"</B></H1></CENTER>");
	  
    }
		
//************************************************
//Explorer acumula en pantalla les lletres escrites
//************************ ************************
    function eacumula ()
    { 
	
	if (f_e=="valida")
	  {
	  
	  var t="<CENTER><H1><B>"+texto+"</B></H1></CENTER><BR><CENTER><H1><B> <IMG SRC = "+directori+dibu+" width=300 height=300></B></H1></CENTER> <EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>"
	  MiPrimerObjeto.document.write(t); 
	  fons=t;
	  texto="";    
	 
	  }
	 if (f_e=="acumula")
	 
	  {     
	   	MiPrimerObjeto.document.write (fons);
		MiPrimerObjeto.document.write ("<CENTER><H1><B>"+texto+"</B></H1></CENTER>");
	  }
	if (f_e=="pregunta")
		{MiPrimerObjeto.document.write (fons);
		 MiPrimerObjeto.document.write ("<EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
		}
  	  
	if (f_e=="altaveu")
		{
		 //var t="<CENTER><H1><B>"+texto+"</B></H1></CENTER><BR><CENTER><H1><B> <IMG SRC = "+directori+dibu+" width=300 height=300></B></H1></CENTER> <EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>"
	         //MiPrimerObjeto.document.write(t); 
		 MiPrimerObjeto.document.write (fons);
		 MiPrimerObjeto.document.write ("<CENTER><H1><B>"+texto+"</B></H1></CENTER>");
		 MiPrimerObjeto.document.write ("<EMBED    SRC="+directori+so+"    HIDDEN=TRUE   _AUTOSTART=FALSE   NAME='firstSound'   MASTERSOUND>");
		}
  	}
