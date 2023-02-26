import './club-item.js';

class ClubList extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    // Fungsi set clubs digunakan untuk menetapkan properti this._clubs pada class ini. 
    // Nantinya, properti tersebut akan digunakan pada fungsi render() dalam membuat 
    // custom element <club-item>.
    set clubs(clubs) {
        this._clubs = clubs;
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
        this.shadowDOM.innerHTML = '';
        this._clubs.forEach(club => {
            const clubItemElement = document.createElement('club-item');
            
            // // memanggil fungsi setter club() pada club-item.
            clubItemElement.club = club;
            
            this.shadowDOM.appendChild(clubItemElement);
        });
    }
}

customElements.define('club-list', ClubList);