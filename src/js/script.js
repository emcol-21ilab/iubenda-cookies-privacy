const seatsContainer = document.querySelector('.seats_container');
//seats non occupied
const seats = seatsContainer.querySelectorAll('.seat:not(.occupied)');
const allSeats = seatsContainer.querySelectorAll('.seat');
//results
const count = document.getElementById('count');
const total = document.getElementById('total');
//select
const movieSelect = document.getElementById('movie_picker');
//select price value as number
let ticketPrice = +movieSelect.value;

//Get data from localstorage and populate UI
const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //check if value exists in the storage
    if (selectedSeats !==  null && selectedSeats.length > 0) {
        
        allSeats.forEach((seat, index) => {
            //if an index seat match with the localstorage then update UI
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    //check if value exists in the storage
    if (selectedMovieIndex !==  null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//update total and count function
const updateSelectedCount = () => {

    //convert nodelist of selected seats into arr
    const selectedSeats = [...seatsContainer.querySelectorAll(".seat.selected")];
    
    //Map through array
    //return a new array of indexes, each index indentifies a seat
    const seatsIndex = selectedSeats.map(seat => [...allSeats].indexOf(seat));
   
    // Save selected seats indexes to storage
    setSeatsData(seatsIndex);

    //updating UI with new total and count
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Save selected movie index and price to storage
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};
// Save selected seats indexes to storage
const setSeatsData = (seatsIndex) => {
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
};




//***** HANDLERS

//movie click event handler
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    //HTMLSelectElement.selectedIndex reflects the index of the first or last selected <option> element
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});
//seat click event handler
seatsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});


//Get data from localstorage and populate UI
populateUI();
//initial count and total set
updateSelectedCount();