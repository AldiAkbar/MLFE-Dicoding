class Navbar extends HTMLElement {
    constructor() {
      super();
      this.shadowDOM = this.attachShadow({mode: 'open'});
    }
  
    connectedCallback() {
      this.render();
    }
   
    render() {
      this.shadowDOM.innerHTML = `
      <style>
        nav {
            background-color: #404258;
            padding: 1rem;
            color: #fff;
        }
    
        h1 {
            font-size: 2.4rem;
            margin: 0.5rem;
            text-align: center;
        }
      </style>
        <nav>
            <h1>My Movies</h1>
        </nav>
      `;
    }
  }
   
  customElements.define('nav-bar', Navbar);