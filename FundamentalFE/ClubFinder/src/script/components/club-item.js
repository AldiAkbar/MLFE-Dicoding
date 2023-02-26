class ClubItem extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    set club(club) {
        this._club = club;
        this.render();
    }
   
    render() {
        this.shadowDOM.innerHTML = `
        <style>
        margin: 1rem;

        section {
            display: flex;
            flex-direction: column;
            text-align: center;
        }

        h2 {
            color: #4361ee;
            margin-bottom: 1rem;
            font-size: 2.44rem;
        }

        h3 {
            color: #b5179e;
            margin-bottom: 1rem;
            font-size: 1.59rem;
        }

        p {
            color: #64748b;
            margin-bottom: 1rem;
        } 

        a {
            text-decoration: none;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 25px;
        }

        @media (min-width: 992px) {
            max-width: 1200px;
            margin: 3rem auto;

            section {
                margin: 0 1rem;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                text-align: left;
            }

            img {
                max-width: 80%;
            }

            .movie-left {
                flex-basis: 40%;
            }

            .movie-right {
                flex-basis: 60%;
                display: flex;
                justify-content: end;
            }
        }
        </style>
            <img class="fan-art-club" src="${this._club.strTeamBadge}" alt="Fan Art">
            <div class="club-info">
                <h2>${this._club.strTeam}</h2>
                <p>${this._club.strDescriptionEN}</p>
            </div>
            <section>
                <div class="movie-left">
                    <h2>{movie.original_title}</h2>
                    <h3>{genres}</h3>
                    <p>{movie.overview}</p>
                    <a class="trailer" href={"https://www.youtube.com/watch?v=${idTrailer}"} target=".blank">Trailer</a>
                </div>
                <div class="movie-right">
                    <img src={movie.Poster || "https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"} alt="placeholder" />
                </div>
            </section>
        `;
    }
}

customElements.define('club-item', ClubItem);