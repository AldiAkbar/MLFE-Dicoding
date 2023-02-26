import axios from "axios";

const main = () => {
  const searchButton = document.querySelector(".search-button");
  const searchBar = document.querySelector(".input-keyword");
  const URL = `https://api.themoviedb.org/3`;
  const API_KEY = `14d6c7554923a70d8f8562de59d0b9fa`;
  
    function searchMovies() {
      const inputKey = document.querySelector(".input-keyword");

      fetch(`${URL}/search/movie?api_key=${API_KEY}&query=${inputKey.value}&page=1`)
          .then(response => response.json())
          .then(response => {
              const movies = response.Search;
              let cards = "";
              movies.forEach(m => cards += showCards(m));
              const movieContainer = document.querySelector(".movie-container");
              movieContainer.innerHTML = cards;


              // ketika tombol detail di-klik
              const modalDetailButton = document.querySelectorAll(".modal-detail-button");
              modalDetailButton.forEach(btn => {
                  btn.addEventListener("click", function () {
                      const imdbid = this.dataset.imdbid;
                      fetch("http://www.omdbapi.com/?apikey=a7f8387d&i=" + imdbid)
                          .then(response => response.json())
                          .then(m => {
                              const movieDetail = showMovieDetail(m);
                              const modalBody = document.querySelector(".modal-body");
                              modalBody.innerHTML = movieDetail;

                          });
                  });
              });
          });
  }

  searchBar.addEventListener("keyup", function (e) {
      if(e.keyCode === 13){
          searchMovies();
      }

  });

  searchButton.addEventListener("click", function () {
      searchMovies();

  });







  // ===========================================
  // Function

  function showCards(m) {
      return `<div className="movie-item">
        <img src='https://image.tmdb.org/t/p/w300${m.poster_path}' alt=${m.title} />
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-movieid="${m.id}">
                <h3>${m.title}</h3>
            </a>
            <p>${m.year || m.release_date.substring(0, 4)}</p>
        </div>`;
  }


  function showMovieDetail(m) {
      return `<div class="container-fluid">
              <div class="row">
                  <div class="col-md-3">
                      <img src="${m.Poster}" class="img-fluid" alt="">
                  </div>
                  <div class="col-md">
                      <ul class="list-group">
                          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                          <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                          <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                          <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                          <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                      </ul>
                  </div>
              </div>
          </div>`;
  }

};

export default main;
