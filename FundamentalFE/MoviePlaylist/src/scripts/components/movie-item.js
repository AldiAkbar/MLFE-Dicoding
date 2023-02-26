class MovieItem extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    set movie(movie) {
        this._movie = movie;
        this.render();
    }
   
    render() {
        this.shadowDOM.innerHTML = `
        <style>
        img {
            border-radius: 25px;
            max-width: 95%;
            height: auto;
            margin: 0.5rem 0 1rem;
        }

        h3 {
            color: #404258;
            font-size: 1.95rem;
            margin: 0 0 0.5rem;
        }

        p {
            color: #64748b;
            font-size: 1.2rem;
        }

        /* Medium Screen */
        @media (min-width: 768px) {
            .movie-item {
                flex-basis: 50%;
            }
            h3 {
                max-width: 300px;
            }
        }
        
        /* Large Screen */
        @media (min-width: 992px) {
            .movie-item {
                flex-basis: 25%;
                padding: 1rem;
            }
        }
        </style>
        <div className="movie-item">
            <img src='https://image.tmdb.org/t/p/w300${this._movie.poster_path}' alt=${this._movie.title} />
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-movieid="${this._movie.id}">
                <h3>${this._movie.title}</h3>
            </a>
            <p>${this._movie.year || this._movie.release_date.substring(0, 4)}</p>
        </div>
        `;
    }
}

customElements.define('movie-item', MovieItem);