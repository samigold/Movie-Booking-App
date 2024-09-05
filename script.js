const container = document.querySelector('.container'); // Select the container
const seats = document.querySelectorAll('.row .seat:not(.occupied)');  // Select all the seats that are not occupied
const count = document.getElementById('count'); // Select the count
const total = document.getElementById('total'); // Select the total
const movieSelect = document.getElementById('movie'); // Select the movie

//populate UI
populateUI();

let ticketPrice = +movieSelect.value; // Get the value of the movie. the plus sign is to convert it to a number


//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex); // Store the selected movie index in the local storage
    localStorage.setItem('selectedMoviePrice', moviePrice); // Store the selected movie price in the local storage
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // Get the selected seats from the local storage



    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); // Get the selected movie index from the local storage
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie Select Event
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value; // Update the ticket price
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount(); // Call the function to update the count
})


// Update the total amount and number of seats selected
function updateSelectedCount() {
    const selectedseats = document.querySelectorAll('.row .seat.selected'); // Select all the selected seat

    const seatsIndex = [...selectedseats].map((seat)=>[...seats].indexOf(seat)); // Get the index of the selected seats

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // Store the selected seats in the local storage

    const selectedseatsCount = selectedseats.length; // Get the number of selected seats
    count.innerText = selectedseatsCount; // Update the count
    total.innerText = selectedseatsCount * ticketPrice; // Update the total
}

//Seat Click Event
container.addEventListener('click', ((e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
}));    // Call the function to add event listeners 

//Initial count and total set
updateSelectedCount(); // Call the function to update the count 