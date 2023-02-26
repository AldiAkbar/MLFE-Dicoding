import './movie-item.js';

class MovieList extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    // Fungsi set movies digunakan untuk menetapkan properti this._movies pada class ini. 
    // Nantinya, properti tersebut akan digunakan pada fungsi render() dalam membuat 
    // custom element <movie-item>.
    set movies(movies) {
        this._movies = movies;
        this.render();
    }
    
    // fungsi renderError digunakan untuk menangani ketika hasil 
    // pencarian mengalami kegagalan atau tidak ditemukkan.
    renderError(message) {
        this.shadowDOM.innerHTML = '';
        this.shadowDOM.innerHTML += `
        <style>
        .placeholder {
            font-weight: lighter;
            color: rgba(0, 0, 0, 0.5);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        </style>
        <h2 class="placeholder">${message}</h2>
        `;
    }
     
    render() {
        this.shadowDOM.innerHTML = ``;
        this._movies.forEach(movie => {
            const movieItemElement = document.createElement('movie-item');
            // const movieContainerElement = document.getElementsByClassName('movie__container');
            
            // // memanggil fungsi setter movie() pada movie-item.
            movieItemElement.movie = movie;
            
            // movieContainerElement.appendChild(movieItemElement);
            this.shadowDOM.appendChild(movieItemElement);
        });
    }
}

customElements.define('movie-list', MovieList);