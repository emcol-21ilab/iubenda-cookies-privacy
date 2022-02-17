"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var seatsContainer = document.querySelector('.seats_container'); //seats non occupied

var seats = seatsContainer.querySelectorAll('.seat:not(.occupied)');
var allSeats = seatsContainer.querySelectorAll('.seat'); //results

var count = document.getElementById('count');
var total = document.getElementById('total'); //select

var movieSelect = document.getElementById('movie_picker'); //select price value as number

var ticketPrice = +movieSelect.value; //Get data from localstorage and populate UI

var populateUI = function populateUI() {
  var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); //check if value exists in the storage

  if (selectedSeats !== null && selectedSeats.length > 0) {
    allSeats.forEach(function (seat, index) {
      //if an index seat match with the localstorage then update UI
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  var selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); //check if value exists in the storage

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}; //update total and count function


var updateSelectedCount = function updateSelectedCount() {
  //convert nodelist of selected seats into arr
  var selectedSeats = _toConsumableArray(seatsContainer.querySelectorAll(".seat.selected")); //Map through array
  //return a new array of indexes, each index indentifies a seat


  var seatsIndex = selectedSeats.map(function (seat) {
    return _toConsumableArray(allSeats).indexOf(seat);
  }); // Save selected seats indexes to storage

  setSeatsData(seatsIndex); //updating UI with new total and count

  var selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}; // Save selected movie index and price to storage


var setMovieData = function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}; // Save selected seats indexes to storage


var setSeatsData = function setSeatsData(seatsIndex) {
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}; //***** HANDLERS
//movie click event handler


movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value; //HTMLSelectElement.selectedIndex reflects the index of the first or last selected <option> element

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
}); //seat click event handler

seatsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
}); //Get data from localstorage and populate UI

populateUI(); //initial count and total set

updateSelectedCount();
//# sourceMappingURL=all.js.map
