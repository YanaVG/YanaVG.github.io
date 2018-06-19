const apiBaseURL = 'https://api.themoviedb.org/3/';
const $imageBaseUrl = 'http://image.tmdb.org/t/p/w185';
const API_KEY = '?api_key=f8167c43471dee5da36680e2976ba7af';

const $btn_white_theme = $(".white_theme");
const $btn_black_theme = $(".black_theme");
const $body = $("body");
const $navbar = $(".navbar");
const $jumbotron = $(".jumbotron");
const $well = $(".well"); 
const $search_movie = $(".search-movie");

const $btn_save_to_LS = $("#save_to_LocalStorage");
const $saved_movie = $("#saved_movie");

const $nowPlaying = $(".nowPlaying");

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);
    // console.log(searchText)
  });
});

function getNowPlayingData(){
      // axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=f8167c43471dee5da36680e2976ba7af')
      axios.get(apiBaseURL + 'movie/now_playing' + API_KEY)
            .then((response) => {
              const nowPlayingData = response.data.results;
              console.log(nowPlayingData);            
             let output = '';
            $.each(nowPlayingData, (index, movie) => {
              output += `
                   <div class="col-md-3">
                       <div class="well text-center">
                         <img src="http://image.tmdb.org/t/p/w300${movie.poster_path}">                       
                         <h5>${movie.title}</h5>
                         <a onclick ="movieSelected('${movie.id}')" href="#" class="btn btn-info">Movie Details</a>
                       </div>
                   </div>
              `;
            });
             // console.log(output);
             $('#movies').html(output);         
            })
            .catch((err) => {
               console.log(err);
            });
  
}
 $nowPlaying.click(getNowPlayingData);

 function getMoviesByGenre(genre_id) {
    axios.get(apiBaseURL + 'genre/' + genre_id + '/movies' + API_KEY + '&language=en-US&include_adult=false&sort_by=created_at.asc')
          .then((response) => {
            console.log(response);
            let getMoviesByGenreURL = response.data.results;
            // console.log(getMoviesByGenreURL);
             let output = '';
            $.each(getMoviesByGenreURL, (index, movie) => {
              // console.log(`index: ${index}`);
              // console.log(movie);
          
          //check pictures
             function verifiedPicture(item) {
                  var imgSrc = '';
                  if(!item.poster_path) {  
                   imgSrc = 'img/movie_dog.png';
                   // console.log(imgSrc);
                  } else {
                    imgSrc = `http://image.tmdb.org/t/p/w185` + `${item.poster_path}`;
                     // console.log(imgSrc);
                  }
                  return imgSrc;
                }
              output += `
                   <div class="col-md-3">
                       <div class="well text-center">
                         <img src="${verifiedPicture(movie)}">                       
                         <h5>${movie.title}</h5>
                         <a onclick ="movieSelected('${movie.id}')" href="#" class="btn btn-info">Movie Details</a>
                       </div>
                   </div>
              `;
            });
            $("#movies").html(output);
          })    
          .catch((err) => {
          console.log(err);
        });
}
   
  var nowPlayingHTML = '';
  var genreHTML = '';
   
  $('.nowPlaying').click(function(){
    getNowPlayingData();
    $('#movie-grid').html(nowPlayingHTML);
    $('#movieGenreLabel').html("Now Playing");
  });
  $('#action').click(function(){
    getMoviesByGenre(28);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Action");
  });
  $('#adventure').click(function(){
    getMoviesByGenre(12);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Adventure");
  });
  $('#animation').click(function(){
    getMoviesByGenre(16);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Animation");
  });
  $('#comedy').click(function(){
    getMoviesByGenre(35);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Comedy");
  });
  $('#crime').click(function(){
    getMoviesByGenre(80);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Crime");
  });
  $('#drama').click(function(){
    getMoviesByGenre(18);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Drama");
  });
  $('#family').click(function(){
    getMoviesByGenre(10751);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Family");
  });
  $('#fantasy').click(function(){
    getMoviesByGenre(14);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Fantasy");
  });
  $('#history').click(function(){
    getMoviesByGenre(36);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("History");
  });
  $('#horror').click(function(){
    getMoviesByGenre(27);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Horror");
  });
  $('#music').click(function(){
    getMoviesByGenre(10402);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Music");
  });
  $('#romance').click(function(){
    getMoviesByGenre(10749);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Romance");
  });
  $('#scifi').click(function(){
    getMoviesByGenre(878);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Science Fiction");
  });
  $('#thriller').click(function(){
    getMoviesByGenre(53);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Thriller");
  });



function getMovies(searchText){
    axios.get(apiBaseURL +'search/movie' + API_KEY + '&query=' + searchText)
        .then((response) => {
          // console.log(response)
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
              // console.log(`index: ${index}`);
              // console.log(movie);
            
             function verifiedPicture(item) {
                  var imgSrc = '';
                  if(!item.poster_path) {  
                   imgSrc = 'img/movie_dog.png';
                   // console.log(imgSrc);
                  } else {
                    imgSrc = $imageBaseUrl + `${item.poster_path}`;
                     // console.log(imgSrc);
                  }
                  return imgSrc;
                }

              output += `
                   <div class="col-md-3">
                       <div class="well text-center">
                         <img src="${verifiedPicture(movie)}">                       
                         <h5>${movie.title}</h5>
                         <a onclick ="movieSelected('${movie.id}')" href="#" class="btn btn-info">Movie Details</a>
                       </div>
                   </div>
              `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
          console.log(err);
        });
}

 function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
 }

// LocalStorage
 function handleBtnClick(movieId) {
   let asString = JSON.stringify(movieId);
   let saved_movie_to_localStorage = localStorage.setItem("films", asString);
   window.location = 'movie.html';
   console.log( saved_movie_to_localStorage );
   $saved_movie.html('<p>Movie saved</p>');
 }
 // function handleYoutubeLink() {
 //   let movieId = sessionStorage.getItem('movieId');
 //    axios.get('https://api.themoviedb.org/3/movie/'+ movieId + '/videos' + API_KEY + '&language=en-US')
 //    // 'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US'
 //         .then((response) => {
 //          console.log(response);
 //          let linkOnYoutube = response.results[0];
 //          console.log(linkOnYoutube);

 //      })
 // }

 function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
   axios.get('https://api.themoviedb.org/3/movie/'+ movieId + API_KEY)
        .then((response) => {
          console.log(response);
          let movie = response.data;
 
          const saveWithMovie = () => handleBtnClick(movie.original_title);
          $btn_save_to_LS.click(saveWithMovie);
            
          // const getYoutubeLink = () => handleYoutubeLink()  
            //don't work link on youtube
            let youtubeKey = movie.imdb_id;
            let youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;

          let output = `
               <div class="row">
                 <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie" class="thumbnail" id="thumbnail_big_picture">
                 </div>
                  <div class="col-md-6">
                    <h2>${movie.title}</h2>
                    <ul class="list-group">
                       <li class="list-group-item"><strong>Genre: </strong> ${movie.genres[0].name}</li>
                       <li class="list-group-item"><strong>Released: </strong> ${movie.release_date}</li>
                       <li class="list-group-item"><strong>Vote Average: </strong> ${movie.vote_average}</li>
                       <li class="list-group-item"><strong>Run Time: </strong> ${movie.runtime}min</li>
                       <li class="list-group-item"><strong>Origin language: </strong> ${movie.original_language}</li>
                       <li class="list-group-item"><strong>Production Companies: </strong> ${movie.production_companies[0].name}</li>
                       <li class="list-group-item"><strong>Watch triller on Youtube: </strong><a href="${youtubeLink}">&#9658 Play trailer</a></li>
                    </ul>
                 </div>
               </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.overview}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go back to seach</a>
                    </div>
               </div>

          `;
          $('#movie').html(output);
        })
        .catch((err) => {
          console.log(err);
        });
 }

// change theme
$btn_black_theme.click(setCssSectionBlack);
$btn_white_theme.click(setCssSectionWhite);

function setCssSectionBlack() {
   $body.css('background', '#060606');
   $navbar.css('background', '#060606');
   $jumbotron.css('background', '#151515');
   $search_movie.css('color', '#fff')
                .css('fontWeight', 'bold');
   $well.css('background', '#151515'); //???
}

function setCssSectionWhite() {
   $body.css('background', '#43efed');
   $navbar.css('background', '#43efed');
   $jumbotron.css('background', '#2ac8c6');
   $search_movie.css('color', '#000')
                .css('fontWeight', 'bold');
   //??
}
