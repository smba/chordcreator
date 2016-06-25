/**
 * start int chord int[]
 */

function colorise(start, chord) {
	// get element by id
	var startElement = document.getElementById(start.toString());
	startElement.style.fill = '#ffcc33';
	document.getElementById("notes").innerHTML = "";
	var i;
	for (i = 0; i < chord.length; i++) {
		var chordElement = document.getElementById(chord[i] + start);
		chordElement.style.fill = '#ff9900';
		// alert(document.getElementById(chord[i]).getAttribute("name"));
		pos = chord[i] + start;
		document.getElementById("notes").innerHTML += document.getElementById(
				pos).getAttribute("name");
		if (i < chord.length - 1) {
			document.getElementById("notes").innerHTML += " - ";
		}
	}
}

function clearKeys() {
	var i;
	for (i = 0; i <= 35; i++) {

		var currentKey = document.getElementById(i.toString());

		var base = currentKey.getAttribute("base");
		currentKey.style.fill = base;

	}
}

function getChord(start) {

	var e = document.getElementById("chordtype");

	var chordtype = e.options[e.selectedIndex].value;

	if (chordtype == "dur") {
		var chord = [ 0, 4, 7 ];
	} else if (chordtype == "moll") {
		var chord = [ 0, 3, 7 ];
	} else if (chordtype == "durmaj7") {
		var chord = [ 0, 4, 7, 11 ];
	} else if (chordtype == "dur7") {
		var chord = [ 0, 4, 7, 10 ];
	} else if (chordtype == "moll7") {
		var chord = [ 0, 3, 7, 10 ];
	} else if (chordtype == "mollmaj7") {
		var chord = [ 0, 3, 7, 11 ];
	} else if (chordtype == "jazzdurmaj7-1") {
		var chord = [ 4, 7, 11, 14 ];
	} else if (chordtype == "jazzdur7-1") {
		var chord = [ 4, 9, 10, 14 ];
	} else if (chordtype == "jazzmoll7-1") {
		var chord = [ 3, 7, 10, 14 ];
	} else if (chordtype == "jazzdurmaj7-2") {
		var chord = [ -1, 2, 4, 7 ];
	} else if (chordtype == "jazzdur7-2") {
		var chord = [ -2, 2, 4, 9 ];
	} else if (chordtype == "jazzmoll7-2") {
		var chord = [ -2, 2, 3, 7 ];
	}
	return chord;
}

// main
$(function() {

	// Global variables
	var lastStartKey = -1;

	$("rect").click(function(event) {
		clearKeys();
		colorise(parseInt(event.target.id), getChord());
		lastStartKey = parseInt(event.target.id);
	});

	$("select#chordtype").change(function(event) {
		clearKeys();
		if (lastStartKey != -1) {
			colorise(lastStartKey, getChord());
		}
	});
});
