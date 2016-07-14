var MAX_VALUE = 1408,
    COLUMNS = 8,
    PARTS = 12;

var arr = [],
    timer1,
    timer2,
    cursorX,
    cursorY,
    alt = document.getElementById('alt'),
    alt_txt = document.getElementById('alt_txt');

function Column(x, n) {
  this.div;
  this.txt;
  this.xPos = x;
  this.name = n || 'id#';
}

function init(){
  buildColumns();

  timer1 = setInterval(tick, 3000);
  timer2 = setInterval(updateAltPos, 13);

  document.addEventListener("mousemove", function(e){
      cursorX = e.pageX;
      cursorY = e.pageY;
  });
}

function updateAltPos(){
    alt.style.left = cursorX-21+'px';
    alt.style.top = cursorY-40+'px';
}

function buildColumns() {

  for (var i = 0; i < COLUMNS; i++) {
    var col = new Column(45 * i, i+1);
    document.getElementById('holder').appendChild(col.drawColumn());
    arr.push(col);
  }

  var val = 0;

  var line = document.getElementById('yline');
  var pos = Math.floor(line.offsetHeight / PARTS);

  for (var a = 0; a <= PARTS; a++) {

    if (a !== 0) {
      if (a !== PARTS) {
        val += Math.floor(MAX_VALUE / PARTS);
      } else {
        val = MAX_VALUE;
      }
    }

    var elem = document.createElement('div');
    var elem_num = document.createElement('p');

    elem_num.innerHTML = val;

    elem.setAttribute("class", "node");
    elem.style.bottom = pos * a + "px";

    elem.appendChild(elem_num);
    line.appendChild(elem);

    tick();
  }
}

function showAlt(txt){
  alt.style.display = "block";
  alt_txt.innerHTML = 'id: Month#'+txt;
}

function hideAlt(){
  alt.style.display = "none";
}

Column.prototype.drawColumn = function() {

  this.div = document.createElement('div');
  this.txt = document.createElement('p');

  this.div.addEventListener("mouseenter", function(txt){
    return function(){
      showAlt(txt);
    }
  }(this.name));

  this.div.addEventListener("mouseleave", hideAlt);

  with(this) {
    txt.innerHTML = 0;
    div.appendChild(this.txt);
    div.style.left = this.xPos + "px";
    div.setAttribute('class', "column");

    return div;
  }
}

Column.prototype.update = function(h) {
  this.txt.innerHTML = Math.floor(h);
  this.div.style.height = 100 * h / MAX_VALUE + "%";
}

function tick() {
  for (var i = 0; i < arr.length; i++) {
    arr[i].update(getRandomInt(0, MAX_VALUE));
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("load", init);
