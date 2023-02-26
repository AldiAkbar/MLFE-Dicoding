class SearchBar extends HTMLElement {
    
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }
    
    render() {
        this.shadowDOM.innerHTML = `
        <style>
        .search-container {
            max-width: 800px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            border-radius: 5px;
            display: flex;
            position: sticky;
            margin: 50px auto;
            background-color: white;
        }
        
        .search-container > input {
          width: 75%;
          padding: 16px;
          border: 0;
          border-bottom: 1px solid #404258;
          font-weight: bold;
        }
        
        .search-container > input:focus {
          outline: 0;
          border-bottom: 2px solid #404258;
        }
        
        .search-container > input:focus::placeholder {
          font-weight: bold;
        }
        
        .search-container > input::placeholder {
          color: #404258;
          font-weight: normal;
        }
        
        .search-container > button {
          width: 23%;
          cursor: pointer;
          margin-left: auto;
          padding: 16px;
          background-color: #404258;
          color: white;
          border: 0;
          text-transform: uppercase;
        }
        
        @media screen and (max-width: 550px) {
          .search-container {
            flex-direction: column;
            position: static;
          }
        
          .search-container > input {
            width: 100%;
            margin-bottom: 12px;
          }
        
          .search-container > button {
            width: 100%;
          }
        }
        </style>
        <div id="search-container" class="search-container">
            <input placeholder="search movies..." class="input-keyword" id="searchElement" type="search">
            <button id="searchButtonElement" type="submit">Search</button>
        </div>
        `;
        // Dikarenakan elemen ini terdapat elemen <button> yang harus memiliki 
        // sebuah event ketika ia ditekan, maka kita harus menyediakan setter. 
        // Gunanya adalah menetapkan fungsi event agar dapat mudah 
        // diterapkan dari luar class SearchBar.
        this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
    }

    get value() {
        return this.shadowDOM.querySelector('#searchElement').value;
    }
    
}

customElements.define('search-bar', SearchBar);
