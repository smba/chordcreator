// Define chord types as an object for easy lookup
const chordTypes = {
    dur: [0, 4, 7],
    moll: [0, 3, 7],
    durmaj7: [0, 4, 7, 11],
    dur7: [0, 4, 7, 10],
    moll7: [0, 3, 7, 10],
    mollmaj7: [0, 3, 7, 11],
    jazzdurmaj7_1: [4, 7, 11, 14],
    jazzdur7_1: [4, 9, 10, 14],
    jazzmoll7_1: [3, 7, 10, 14],
    jazzdurmaj7_2: [-1, 2, 4, 7],
    jazzdur7_2: [-2, 2, 4, 9],
    jazzmoll7_2: [-2, 2, 3, 7],
  };
  
  let lastStartKey = -1;
  
  /**
   * Colorizes the keys on the web page based on the start key and chord.
   * @param {number} start - The start key.
   * @param {number[]} chord - The chord notes.
   */
  function colorize(start, chord) {
    const startElement = document.getElementById(start.toString());
    if (startElement) {
      startElement.style.fill = "#ffcc33";
    }
  
    const noteNames = chord.map(note => {
      const position = start + note;
      const chordElement = document.getElementById(position.toString());
      if (chordElement) {
        chordElement.style.fill = "#ff9900";
        return chordElement.getAttribute("name");
      }
      return "";
    });
  
    document.getElementById("notes").textContent = noteNames.filter(Boolean).join(" - ");
  }
  
  /**
   * Resets the colors of all keys on the web page.
   */
  function clearKeys() {
    for (let i = 0; i <= 35; i++) {
      const keyElement = document.getElementById(i.toString());
      if (keyElement) {
        const baseColor = keyElement.getAttribute("base");
        keyElement.style.fill = baseColor;
      }
    }
  }
  
  /**
   * Retrieves the selected chord type from the dropdown menu.
   * @returns {number[]} The chord notes.
   */
  function getChord() {
    const chordTypeSelect = document.getElementById("chordtype");
    const selectedValue = chordTypeSelect?.value;
    return chordTypes[selectedValue] || [];
  }
  
  // Main
  $(document).ready(() => {
    /**
     * Event handler for clicking on keys.
     */
    $("rect").on("click", event => {
      clearKeys();
      const start = parseInt(event.target.id, 10);
      const chord = getChord();
      colorize(start, chord);
      lastStartKey = start;
    });
  
    /**
     * Event handler for changing the chord type.
     */
    $("#chordtype").on("change", () => {
      clearKeys();
      if (lastStartKey !== -1) {
        const chord = getChord();
        colorize(lastStartKey, chord);
      }
    });
  });
  
