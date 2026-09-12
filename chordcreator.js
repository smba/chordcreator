var chordTypes = {
  "dur": [0, 4, 7],
  "moll": [0, 3, 7],
  "durmaj7": [0, 4, 7, 11],
  "dur7": [0, 4, 7, 10],
  "moll7": [0, 3, 7, 10],
  "mollmaj7": [0, 3, 7, 11],
  "jazzdurmaj7-1": [4, 7, 11, 14],
  "jazzdur7-1": [4, 9, 10, 14],
  "jazzmoll7-1": [3, 7, 10, 14],
  "jazzdurmaj7-2": [-1, 2, 4, 7],
  "jazzdur7-2": [-2, 2, 4, 9],
  "jazzmoll7-2": [-2, 2, 3, 7]
};

var lastStartKey = -1;

function colorize(start, chord) {
  var startElement = document.getElementById(String(start));
  if (startElement) {
    startElement.style.fill = "#ffcc33";
  }

  var noteNames = [];
  for (var i = 0; i < chord.length; i++) {
    var el = document.getElementById(String(start + chord[i]));
    if (el) {
      el.style.fill = "#ff9900";
      noteNames.push(el.getAttribute("name"));
    }
  }

  document.getElementById("notes").innerHTML = noteNames.join(" - ");
}

function clearKeys() {
  for (var i = 0; i <= 35; i++) {
    var el = document.getElementById(String(i));
    if (el) {
      el.style.fill = el.getAttribute("base");
    }
  }
}

function getChord() {
  var select = document.getElementById("chordtype");
  if (!select) return [];
  return chordTypes[select.value] || [];
}

$(document).ready(function () {
  $("rect").click(function (event) {
    clearKeys();
    var start = parseInt(event.target.id, 10);
    colorize(start, getChord());
    lastStartKey = start;
  });

  $("#chordtype").change(function () {
    clearKeys();
    if (lastStartKey !== -1) {
      colorize(lastStartKey, getChord());
    }
  });
});
