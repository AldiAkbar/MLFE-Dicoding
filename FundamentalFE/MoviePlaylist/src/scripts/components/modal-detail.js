import css from'bootstrap/dist/css/bootstrap.min.css';
class ModalDetail extends HTMLElement {

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
        ${css}
        </style>
        <div class="modal fade" id="movieDetailModal" tabindex="-1" aria-labelledby="movieDetailModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="movieDetailModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-3">
                                    <img src="" class="img-fluid">
                                </div>
                                <div class="col">
                                    <ul class="list-group">
                                        <li class="list-group-item"><h4>Taken (2008)</h4></li>
                                        <li class="list-group-item"><strong>Director : </strong>Aldi Akbar Alimi</li>
                                        <li class="list-group-item"><strong>Actors : </strong>Alfin, Alvina, Alwi</li>
                                        <li class="list-group-item"><strong>Writer : </strong>Anies</li>
                                        <li class="list-group-item"><strong>Plot : </strong> <br> test </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;

    }
}

customElements.define('modal-detail', ModalDetail);