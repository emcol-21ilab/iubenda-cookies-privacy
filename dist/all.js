"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// catching dom elements
var closeButton = document.querySelector(".close-btn");

var toggler = _toConsumableArray(document.querySelectorAll('.toggle'));

var resetButton = document.getElementById('reset'); //event listeners
//hide the alert from UI

closeButton.addEventListener("click", function (e) {
  e.preventDefault;
  document.querySelector("".concat(closeButton.dataset.target)).classList.add('hide');
}); //toggler handler

toggler.forEach(function (el) {
  el.addEventListener("click", function (e) {
    console.log(e.target.dataset.target);
    document.querySelector("".concat(e.target.dataset.target)).classList.toggle('hide');
  });
});
resetButton.addEventListener("click", function (e) {
  e.preventDefault; //reset form

  document.querySelector('form').reset(); //hide 2 container

  _toConsumableArray(document.querySelectorAll(".form-container")).forEach(function (el) {
    el.classList.remove('hide');
    el.classList.add('hide');
  });
});
//# sourceMappingURL=all.js.map
