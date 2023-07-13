
let Movielist=[];
let filterMovieList=[];
// TMDB API endpoint URLs
const nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing';
const genreListURL = 'https://api.themoviedb.org/3/genre/movie/list';
const searchMoviesURL = 'https://api.themoviedb.org/3/search/movie';
// https://api.themoviedb.org/3/search/movie?query=Spider%20Man&include_adult=false&language=en-US&page=1';

// Your TMDB API key
const apiKey = '6f6546c488597640b6c611e630aca586';

// Function to fetch data from TMDB API
async function fetchData(url) {
  const response = await fetch(`${url}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

// Function to create a movie card HTML element
function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const image = document.createElement('img');
  image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  image.alt = movie.title;
  movieCard.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = movie.title;
  movieCard.appendChild(title);

  const language = document.createElement('p');
  language.textContent = `Language: ${movie.original_language}`;
  movieCard.appendChild(language);

  const rating = document.createElement('p');
  rating.textContent = `Rating: ${movie.vote_average}`;
  movieCard.appendChild(rating);

  movieCard.addEventListener('click', () => {
    showMovieDescription(movie);
  });

  return movieCard;
}

// Function to display movie cards in the movie list section
function displayMovies(movies) {
  const movieListSection = document.getElementById('movieList');
  movieListSection.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    movieListSection.appendChild(movieCard);
  });
}

// Function to fetch and display movies (Now Playing)
async function fetchAndDisplayMovies() {
  try {
    const data = await fetchData(nowPlayingURL);
    const movies = data.results;
    Movielist=data.results;
    displayMovies(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

// Function to fetch and display genre list
async function fetchAndDisplayGenres() {
  try {
    const data = await fetchData(genreListURL);
    const genres = data.genres;
    const genreButtons = document.getElementById('genreButtons');

    genres.forEach(genre => {
      const genreButton = document.createElement('li');
      genreButton.textContent = genre.name;
      // genreB
      genreButton.addEventListener('click', () => {
        filterMoviesByGenre(genre.id);
      });
      genreButtons.appendChild(genreButton);
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

// Function to filter movies by genre
function filterMoviesByGenre(genreId) {
  const movieListSection = document.getElementById('movieList');
  const genreMovies = movieListSection.getElementsByClassName('movie-card');

  // for (let i = 0; i < genreMovies.length; i++) {
  //   const movieCard = genreMovies[i];
  //   const genreIds = movieCard.dataset.genreIds.split(',').map(id => parseInt(id));
    
  //   if (genreIds.includes(genreId)) {
  //     movieCard.style.display = 'block';
  //   } else {
  //     movieCard.style.display = 'none';
  //   }
  // }
  filterMovieList=Movielist.filter((movie)=>{
    // console.log(movie.genre_ids.indexOf(genreId)>=0);
    return movie.genre_ids.indexOf(genreId)>=0;
    
  })
  displayMovies(filterMovieList);
}
//calculate prise

//show the pop up movie booking option

function showMovieDescription(movie) {
  const modal = document.getElementById('movieModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalRating = document.getElementById('modalRating');
  const modalLanguage = document.getElementById('modalLanguage');
  const modalDuration = document.getElementById('modalDuration');
  const modalGenre = document.getElementById('modalGenre');
  const modalOverview = document.getElementById('modalOverview');
  const modalPrice = document.getElementById('modalPrice');
  // const bookTicketsBtn = document.getElementById('bookTicketsBtn');

  modalTitle.textContent = movie.title;
  modalImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  modalRating.textContent = `Rating: ${movie.vote_average}`;
  modalLanguage.textContent = `Language: ${movie.original_language}`;
  modalDuration.textContent = `Duration: ${movie.runtime} minutes`;
  modalOverview.textContent = `Overview: ${movie.overview}`;

  // Generate a random price between 250-300
  function calprice(){
    const price = Math.floor(Math.random() * (300 - 250 + 1) + 250);
    modalPrice.textContent = `Price: $${price}`;
  }
  calprice();

  // Set up event listener for the "Book Tickets" button
  bookTicketsBtn.addEventListener('click', () => {
    // Redirect the user to the checkout page or perform any desired action
    const disname=document.querySelector('#modalTitle');
    const disappi=document.querySelector('.pop-m-detail');
    disappi.style.display = 'none';
    disname.style.display='none';
    showMovieDescription(movie);
    redirectToCheckout(movie.title);
    // console.log('Book Tickets clicked');
  });

  // Show the modal
  modal.style.display = 'block';

  // Set up event listener for the modal close button
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.addEventListener('click', () => {
    // Hide the modal when the close button is clicked
    modal.style.display = 'none';
    // window.location.reload();
  });

  // Close the modal when the user clicks outside of it
  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}





// Function to handle search debounce
function debounce(func, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, 200);
  };
}

// Function to handle search
async function handleSearch(query) {
  try {
    // console.log(query);
    const url = `${searchMoviesURL}?api_key=${apiKey}&query=${query}&page=1`;
    const data = await fetchData(url);
    const movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

// Function to initialize the app
function initializeApp() {
  fetchAndDisplayMovies();
  fetchAndDisplayGenres();

  const searchInput = document.getElementById('searchInput');
  const debouncedSearch = debounce(handleSearch, 500);

  searchInput.addEventListener('input', event => {
    const query = event.target.value;
    debouncedSearch(query);
  });
}

// Call the initializeApp function when the page loads
window.addEventListener('load', initializeApp);

const price = Math.floor(Math.random() * (300 - 250 + 1) + 250);
 // Constants for ticket price and convenience fee
 const ticketPrice = price; // Set your ticket price here
 const convenienceFeePercentage = 1.75; // Set convenience fee percentage here

 // Function to update the summary section based on user input
 function updateSummary() {
   const numTickets = parseInt(document.getElementById("numTickets").value);
   const convenienceFee = (numTickets * ticketPrice * convenienceFeePercentage) / 100;
   const subtotal = numTickets * ticketPrice + convenienceFee;

   document.getElementById("convenienceFee").textContent = convenienceFee.toFixed(2);
   document.getElementById("subtotal").textContent = subtotal.toFixed(2);
 }

 // Function to submit the form (placeholder function)
 function submitForm() {
   // Add your form submission logic here
    const fn=document.getElementById('firstName').value;
    const ln=document.getElementById('lastName').value;
    const em=document.getElementById('email').value;
    const sl=document.getElementById('paymentMethod').value;
    if(fn==' '){
      alert("First Name Should Be Field");
      return false;
    }
    else if(ln == ''){
      alert("Last Name Should Be field");
      return false;
    }
    else if(em==''){
      alert("Email Should Be field");
      return false;
    }
    else if(sl==''){
      alert("Select any payment Method");
      return false;
    }
    else{
      alert("Movie Booking successfully!");
    }
   
 }

 // Function to redirect to the checkout page
 function redirectToCheckout(movietitle) {
   document.getElementById("movie").textContent = movietitle; // Set the movie title dynamically
   document.getElementById("ticketPrice").textContent = ticketPrice.toFixed(2);
   updateSummary();
   document.getElementById("movieSelection").style.display = "none";
   document.getElementById("checkout").style.display = "block";
 }

