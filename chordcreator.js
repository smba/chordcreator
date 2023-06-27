// Define chord types as an object for easy lookup
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

// Global variables
var lastStartKey = -1;

/**
 * Colorizes the keys on the web page based on the start key and chord.
 * @param {number} start - The start key.
 * @param {number[]} chord - The chord notes.
 */
function colorize(start, chord) {
  var startElement = document.getElementById(start.toString());
  startElement.style.fill = '#ffcc33';
  document.getElementById("notes").innerHTML = chord.map(function(note) {
    var pos = start + note;
    var chordElement = document.getElementById(pos.toString());
    chordElement.style.fill = '#ff9900';
    return chordElement.getAttribute("name");
  }).join(" - ");
}

/**
 * Resets the colors of all keys on the web page.
 */
function clearKeys() {
  for (var i = 0; i <= 35; i++) {
    var currentKey = document.getElementById(i.toString());
    var base = currentKey.getAttribute("base");
    currentKey.style.fill = base;
  }
}

/**
 * Retrieves the selected chord type from the dropdown menu.
 * @returns {number[]} The chord notes.
 */
function getChord() {
  var e = document.getElementById("chordtype");
  var chordtype = e.options[e.selectedIndex].value;
  return chordTypes[chordtype];
}

// Main
$(function() {
  /**
   * Event handler for the click event on the SVG elements (keys).
   */
  $("rect").click(function(event) {
    clearKeys();
    var start = parseInt(event.target.id);
    var chord = getChord();
    colorize(start, chord);
    lastStartKey = start;
  });

  /**
   * Event handler for the change event on the select element (chord type).
   */
  $("select#chordtype").change(function(event) {
    clearKeys();
    if (lastStartKey !== -1) {
      var chord = getChord();
      colorize(lastStartKey, chord);
    }
  });
});
