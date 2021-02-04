console.log('edu_portada_baner.js');

// Globals
let playTimer;
let platTimerDuration = 5000;

// Main
addBannerImages();
addBannerTitle();
addBannerBottomNav();

let innerBannerNav = `
  <ul class="innerBannerNav">
    <li>
      <button id="prev-button" data-action="prev" title="Activitat anterior">
        <span class="visuallyhidden">Activitat anterior</span>
        <span> < </span>             
      </button>
    </li>
    <li>
      <button id="next-button" data-action="next" title="Activitat següent">
        <span class="visuallyhidden">Activitat següent</span>
        <span> > </span>
      </button> 
    </li>
    <li></li>
  </ul>
`;
$('#slides-wrapper').append(innerBannerNav);


play();

// Funciones
function addBannerImages() {
  let slidesHtml = '<div id="slides-wrapper"><ul class="slides" aria-hidden="true">';

  BANER.forEach(function (slide, index) {
    let current = (index === 0)? 'current':'';

    let slideHtml = `
      <li class="slide ${current}" data-index="${index + 1}">      
        <a href="${slide.link}" target="_blank" tabindex="-1">
          <img class="img-responsive slide-image" src="${slide.imatge}" alt="${slide.text}" />        
        </a>
      </li>
    `;

    slidesHtml += slideHtml;  
  });

  slidesHtml += '</ul></div>';
  $('#section-baner').append(slidesHtml);
}

function addBannerTitle() {
  $('#section-baner').append(`
    <div id="slide-text">
      <a href="${BANER[0].link}">${BANER[0].text}</a>
    </div>
  `);
}

function addBannerBottomNav() {
  let slidenavHtml = '<ul class="slidenav">';
  slidenavHtml += `
    <li>
      <button id="play-button" data-action="start" title="Iniciar animació">
        <span id="play-button-text" class="visuallyhidden">Iniciar animació</span>
        <img aria-hidden="true" id="play-img" src="img/banner_play.png" alt="Imatge de play">
        <img aria-hidden="true" id="stop-img" src="img/banner_stop.png" alt="Imatge de stop">
      </button>
    </li>
  `;
  for (let i = 1; i <= BANER.length; i++) {
    if (i === 1) {
      slidenavHtml += `
        <li>
          <button class="slidenav-button current" data-slide="${i}">
            <span class="visuallyhidden">Activitat</span> ${i}
            <span id="current-flag" class="visuallyhidden">(Activitat actual)</span>
          </button>
        </li>
      `;
    } else {
      slidenavHtml += `
        <li>
          <button class="slidenav-button" data-slide="${i}">
            <span class="visuallyhidden">Activitat</span> ${i}
          </button>
        </li>
      `;
    }
  }

  slidenavHtml += '</ul>';
  $('#section-baner').append(slidenavHtml);
}

function goToSlide(index, forward = true) {
  console.log(`goToSlide(${index})`);
  let currentButton = $('.slidenav-button.current');
  let nextButton = $(`.slidenav-button[data-slide=${index}]`);
  let currentSlide = $('.slide.current');
  let nextSlide = $(`.slide[data-index=${index}]`);
  let textSlide = $('#slide-text a');
  let duration = 600;
  
  currentButton.removeClass('current');
  currentButton.find("#current-flag").remove();
  nextButton.addClass('current');
  nextButton.append('<span id="current-flag" class="visuallyhidden">(Activitat actual)</span>');
  
  let currentEndLeft, nextStartLeft;
  if (forward) {
    currentEndLeft = '-100%';
    nextStartLeft = '100%';
  } else {
    currentEndLeft = '100%';
    nextStartLeft = '-100%';
  }
  
  nextSlide.css('left', nextStartLeft);
  currentSlide.animate(
    {left: currentEndLeft},
    {
      duration: duration,       
      start: function() {
        currentSlide.addClass('in-transition');
        nextSlide.addClass('in-transition');
        currentSlide.removeClass('current');        
        nextSlide.addClass('current');         
      },
      step: function( now, fx ) {        
        let newLeft = parseInt(nextStartLeft) + parseFloat(now);       
        nextSlide.css('left', `${newLeft}%`);       
      },
      done: function() {
        currentSlide.removeClass('in-transition');
        nextSlide.removeClass('in-transition');        
      }
    }
  );  
  
  textSlide.animate({opacity: 0}, duration/2, function() {
    let slideObject = BANER[index - 1];
    textSlide.html(slideObject.text);
    textSlide.attr('href', slideObject.link);
  });
  
  textSlide.animate({opacity: 1}, duration/2);  
}

function goToNextSlide() {
  let currentIndex = $('.slide.current').attr('data-index');
  let nextIndex = parseInt(currentIndex) + 1;
  
  if (nextIndex > BANER.length) {
    nextIndex = 1;
  }
  
  goToSlide(nextIndex, true);
}

function goToPrevSlide() {
  let currentIndex = $('.slide.current').attr('data-index');
  let nextIndex = parseInt(currentIndex) - 1;
  
  if (nextIndex < 1) {
    nextIndex = BANER.length;
  }
  
  goToSlide(nextIndex, false);
}

function play() {
  let playButton = $('#play-button');
  playButton.attr('data-action', 'stop');
  playButton.attr('title', 'Aturar animació');
  playButton.find('#play-button-text').html('Aturar animació');
  playButton.find('#stop-img').show();
  playButton.find('#play-img').hide();
  
  
  //playButton.html('<span class="visuallyhidden"></span><img src="img/banner_stop.png">'); 
  playTimer = setInterval(goToNextSlide, platTimerDuration);
}

function stop() {
  let playButton = $('#play-button');
  playButton.attr('data-action', 'start');
  playButton.attr('title', 'Iniciar animació');
  playButton.find('#play-button-text').html('Iniciar animació');
  playButton.find('#play-img').show();
  playButton.find('#stop-img').hide();
  //playButton.html('<span class="visuallyhidden">Iniciar animació</span><img src="img/banner_play.png">');
  clearInterval(playTimer);
}

// EVENTOS
$('#play-button').click(function() {
  if ($(this).attr('data-action') === 'start') {
    play();
  } else {
    stop();
  }
});

$('.slidenav-button').click(function() {
  let _this = $(this); 
  
  if (!_this.hasClass('current')) {
    let currentSlideIndex = $('.slide.current').attr('data-index');
    let nextSlideIndex = _this.attr('data-slide');
    
    if (nextSlideIndex > currentSlideIndex) {
      goToSlide(nextSlideIndex, true);
    } else {
      goToSlide(nextSlideIndex, false);
    }    
  }
});

$('#prev-button').click(function() {
  goToPrevSlide();
});

$('#next-button').click(function() {
  goToNextSlide();
});


