var images =[
'/assets/bgs/2.jpg',  //gonzo
'/assets/bgs/4.jpg',  //hope
'/assets/bgs/5.jpg',  //zach
'/assets/bgs/8.png',  //vanessa
'/assets/bgs/3.jpg',  //morgan
'/assets/bgs/1.jpg',  //trio
'/assets/bgs/6.jpg'  //fisladies
]

var tracks = [
  {
    title : "You Basic (Original Mix)",
    scID : "148401526"
  },
  {
    title : "All About That Bass (2014)",
    scID : "162022719"
  },
  {
    title : "Shake It Off (Neon NiteClub Remix)",
    scID : "165231752"
  },
  {
    title : "Fancy Remix",
    scID : "165233670"
  }
]

var i = 0;
var auto = true;
var playing = false;
var globalSound;
var currentTrack = 0;
var currentImage = 0;
var touch = true;
var mouseTimeout = null;
var gyro = false;


$(document).ready(function(){

  if (window.DeviceOrientationEvent && 'ontouchstart' in window){
    gyro = true;
  }


  if (!$('html').hasClass('touch')){
    $('html').addClass('no-touch');
    touch = false
  } else {
    FastClick.attach(document.body);
  }
  shuffle(tracks);
  sizing();
  initSC();
  $('.menuBtn').on('click', function(){
    $('.expandMenu').slideToggle();
    $(this).toggleClass('active');
  })

  $('body').on('mousemove', function(){
      auto = false;
  });

  $('.pauseBtn').on('click', function(){
    $(this).toggleClass('playing');
    if (playing == false) {
      globalSound.play()
      playing = true;
    } else {
      globalSound.pause();
      playing = false;
    }
  })

  $('.skipBtn').on('click', function(){
    skipTrack();
    if (!$('.pauseBtn').hasClass('playing')){
      $('.pauseBtn').addClass('playing');
    }
    
  })

  $('.launch-button').on('click', function(){
    $('.pauseBtn').click();
    $('.cover').slideUp({},1500);
    $('.pauseBtn').addClass('playing');
    setTimeout(function(){
     openPortal();
    }, 90000)
  });


  $('.expandClose, canvas').on('click', function(){
    if ($('.expandMenu').is(":visible")){
      $('.expandMenu').slideToggle();
    }
  });


  setInterval(function(){
    changeImage();
  }, 15000)

  $(window).resize(sizing());

  $(document).on('mousemove', function() {
      if (mouseTimeout !== null) {
          clearTimeout(mouseTimeout);
      }

      timeout = setTimeout(function() {
          mouseTimeout = null;
          auto = true;
      }, 1000);
  });

})

function sizing(){
  $('.kyldo').height($(window).height());
  $('.kyldo').width($(window).width());
  $('.cover img').css({'width':($(window).width() * 0.8)});
  $('.expandMenu').css({'bottom' : $('.nav').innerHeight()});
  $('.portal').css({'top':(($(window).height() - (200 + $('.nav').height()))/2)});
  $('.modal .inner').css({'max-height':$(window).height()});

  if($(window).height() > 528){
    $('.modal').css({'top' : (($(window).height() - 590 ) /2 )})
  } else{
    $('.modal .inner').css({'overflow-y':'scroll'});
  }
}

function initSC(){
  SC.initialize({
      client_id: "b89e7c6cd9b038a9a19f8f412168fbb1"
  });
  $('.launchBtn').css({'display':'inline-block'});
  SC.stream("/tracks/" + tracks[0].scID,{
    onfinish: function() {
        skipTrack();
      }
  }, function(sound){
    $('.title').html(tracks[0].title)
      globalSound = sound;
  });

}

function playSC(id){
    SC.stream("/tracks/"+ tracks[id].scID,{
      onfinish: function() {
        skipTrack();
      }
  }, function(sound){
      $('.title').html(tracks[id].title)
      globalSound = sound;
      globalSound.play();
      playing = true;
  });
};


function skipTrack(){
  if (currentTrack < (tracks.length -1)){
    currentTrack++;
  } else {
    currentTrack = 0;
  }
    globalSound.pause();
    playing = false;
    playSC(currentTrack);
}

function openPortal(){
  $('.portal').fadeIn();
  setTimeout(function(){
    closePortal();
  }, 2500)
}

function closePortal(){
  $('.portal').fadeOut();
  setTimeout(function(){
    openPortal();
  }, 90000)
}

function changeImage(){
  if (currentImage < (images.length - 1)){
    currentImage ++;
  }  else {
    currentImage = 0;
  }
  var image = new Image;

  image.onload = (function(_this) {
    return function() { 
      kaleidoscope.image = image;
      return kaleidoscope.draw();
    };
  })(this);

  image.src = images[currentImage];

}

var Kaleidoscope, c, dragger, gui, image, kaleidoscope, onChange, onMouseMoved, options, tr, tx, ty, update, _i, _len, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Kaleidoscope = (function() {
  Kaleidoscope.prototype.HALF_PI = Math.PI / 2;

  Kaleidoscope.prototype.TWO_PI = Math.PI * 2;

  function Kaleidoscope(options) {
    var cRadius;
    if ($(window).width() < 410){
      cRadius = $(window).width() * 1.6;
    } else {
      cRadius = $(window).width() * 0.7;
    }
    var key, val, _ref, _ref1;
    this.options = options != null ? options : {};
    this.defaults = {
      offsetRotation: 0.0,
      offsetScale: 1.0,
      offsetX: 0.0,
      offsetY: 0.0,
      radius: cRadius,
      slices: 10,
      zoom: 1.0
    };
    _ref = this.defaults;
    for (key in _ref) {
      val = _ref[key];
      this[key] = val;
    }
    _ref1 = this.options;
    for (key in _ref1) {
      val = _ref1[key];
      this[key] = val;
    }
    if (this.domElement == null) {
      this.domElement = document.createElement('canvas');
    }
    if (this.context == null) {
      this.context = this.domElement.getContext('2d');
    }
    if (this.image == null) {
      this.image = document.createElement('img');
    }
  }

  Kaleidoscope.prototype.draw = function() {
    var cx, index, scale, step, _i, _ref, _results;
    this.domElement.width = this.domElement.height = this.radius * 2;
    this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
    scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
    step = this.TWO_PI / this.slices;
    cx = this.image.width / 2;
    _results = [];
    for (index = _i = 0, _ref = this.slices; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
      this.context.save();
      this.context.translate(this.radius, this.radius);
      this.context.rotate(index * step);
      this.context.beginPath();
      this.context.moveTo(-0.5, -0.5);
      this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
      this.context.lineTo(0.5, 0.5);
      this.context.closePath();
      this.context.rotate(this.HALF_PI);
      this.context.scale(scale, scale);
      this.context.scale([-1, 1][index % 2], 1);
      this.context.translate(this.offsetX - cx, this.offsetY);
      this.context.rotate(this.offsetRotation);
      this.context.scale(this.offsetScale, this.offsetScale);
      this.context.fill();
      _results.push(this.context.restore());
    }
    return _results;
  };

  return Kaleidoscope;

})();



image = new Image;

image.onload = (function(_this) {
  return function() {
    return kaleidoscope.draw();
  };
})(this);

image.src = images[0];

kaleidoscope = new Kaleidoscope({
  image: image,
  slices: 10
});

kaleidoscope.domElement.style.position = 'absolute';

kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius   + 'px';

kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius - 60 + 'px';

kaleidoscope.domElement.style.left = '50%';

kaleidoscope.domElement.style.top = '50%';

$('.kyldo').append(kaleidoscope.domElement);


tx = kaleidoscope.offsetX;

ty = kaleidoscope.offsetY;

tr = kaleidoscope.offsetRotation;

onMouseMoved = (function(_this) {
  return function(event) {
    var cx, cy, dx, dy, hx, hy;
    cx = window.innerWidth / 2;
    cy = window.innerHeight / 2;
    dx = event.pageX / window.innerWidth;
    dy = event.pageY / window.innerHeight;
    hx = dx - 0.5;
    hy = dy - 0.5;
    tx = hx * kaleidoscope.radius * -2;
    ty = hy * kaleidoscope.radius * 2;
    return tr = Math.atan2(hy, hx);
  };
})(this);

window.addEventListener('mousemove', onMouseMoved, false);
window.addEventListener('touchstart', onMouseMoved, false);
window.addEventListener('touchmove', onMouseMoved, false);

  window.addEventListener('deviceorientation', function(eventData) {
    // Retrieving the front/back tilting of the device and moves the
    // background in the opposite way of the tilt

    var yTilt = Math.round((-eventData.beta + 90) * (40/180) - 40);

    // Retrieve the side to side tilting of the device and move the
    // background the opposite direction.

    var xTilt = Math.round(-eventData.gamma * (20/180) - 20);

    // Thi 'if' statement checks if the phone is upside down and corrects
    // the value that is returned.
    if (xTilt > 0) {
      xTilt = -xTilt;
    } else if (xTilt < -40) {
      xTilt = -(xTilt + 80);
    }

    if (gyro == true){

      var cx, cy, dx, dy, hx, hy;
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;
        dx = (xTilt * 40) / window.innerWidth;
        dy = (yTilt * 40) / window.innerHeight;
        hx = dx - 0.5;
        hy = dy - 0.5;
        tx = hx * kaleidoscope.radius * -2;
        ty = hy * kaleidoscope.radius * 2;
        ty = ty + 20;
        tx = tx + 20;
    }

  }, false);


options = {
  interactive: true,
  ease: 0.1
};

(update = (function(_this) {
  return function() {
    var delta, theta;
    if (options.interactive) {
      if (auto == true){
        tx++;
        ty++;
      }
      delta = tr - kaleidoscope.offsetRotation;
      theta = Math.atan2(Math.sin(delta), Math.cos(delta));
      kaleidoscope.offsetX += (tx - kaleidoscope.offsetX) * options.ease;
      kaleidoscope.offsetY += (ty - kaleidoscope.offsetY) * options.ease;
      kaleidoscope.offsetRotation += (theta - kaleidoscope.offsetRotation) * options.ease;
      kaleidoscope.draw();
    }
    return setTimeout(update, 1000 / 60);
  };
})(this))();


onChange = (function(_this) {
  return function() {
    kaleidoscope.domElement.style.marginLeft = -kaleidoscope.radius + 'px';
    kaleidoscope.domElement.style.marginTop = -kaleidoscope.radius + 'px';
    options.interactive = false;
    return kaleidoscope.draw();
  };
})(this);


function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

