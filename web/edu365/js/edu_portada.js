// La variable/constante ACTUALITAT tiene que estar declara
// La variable/constante AGENDA tiene que estar declara

/************ INICIO ACTUALIDAD *************/
// La variable/constante ACTUALITAT tiene que estar declara
var actualitat_template = Handlebars.compile(`
	{{#each blocks}}
	  <h2 class="titol quadre{{@index}}"><a href="{{url}}" target="_blank">{{titol}}</a></h2>
	  <a class="imatge quadre{{@index}}" href="{{url}}" target="_blank" tabindex="-1">
		  <img src="{{imatge}}" alt="{{titol}}" title="{{titol}}">
	  </a>
	  <div class="text quadre{{@index}}">{{text}}</div>
	  <div class="links quadre{{@index}}">
		  {{#each category_links}}
			<a href="{{url}}" title="Activitats per {name}"><span class="badge {{secureName}}">{{name}}</span></a>			  
		  {{/each}}
	  </div>
	{{/each}}
`);   

// Post prod
ACTUALITAT.forEach(function (e) {
  e.category_links.forEach(function (link) {
  	if (link.name == '+Edu')
      link.secureName = 'mes-edu';
    else
      link.secureName = link.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();		     			 							
  });
});

// console.log(ACTUALITAT);	   
$('.grid-actualitat:first').append(actualitat_template({ blocks: ACTUALITAT }));



$(".quadre0").hover(
  function() {	  
    $(".quadre0").toggleClass("highlight-border");	  	 
  }
);

$(".quadre1").hover(
  function() {	  
    $(".quadre1").toggleClass("highlight-border");	  	 
  }
);

$(".quadre2").hover(
  function() {	  
    $(".quadre2").toggleClass("highlight-border");	  	 
  }
);

/************ FIN ACTUALIDAD *************/


/************ INICIO AGENDA *************/
// La variable/constante AGENDA tiene que estar declara
var agenda_template = Handlebars.compile(`
	{{#each items}}
	  <div class="agenda-item item{{@index}}">       			
		<h2><a href="{{url}}" target="_blank">{{titol}}</a></h2>
		<p>{{text}}</p>
	  </div>	  
	{{/each}}
`);   

// console.log(ACTUALITAT);	   
$('.grid-agenda:first').append(agenda_template({ items: AGENDA }));


/************ FIN ACTUALIDAD *************/
