import { View } from "./View.js";
import icons from "../../img/icons.svg";
class TilesView extends View{

    _errorMessage = 'Something went wrong.<br> Please try reloading the page. <br>⚠';

    addHandlerRender(handler){
        window.addEventListener('load',handler);
    }

    _formatDate(date,locale = navigator.language){
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        };
        return new Intl.DateTimeFormat('pl-PL', options).format(date);
    }
    
    _generateMarkup(){
        return this._data.results.map(this._generateTile.bind(this)).join('');
    }
    _generateTile(result){
        return `
                <div class="character">
                    <div class="name">${result.name}</div>
                    <div class="image"><img src="${result.image}"></div>
                    <div class="list">
                        <ul>
                            <li>
                            <svg>
                            <use href="${icons}#person-svgrepo-com"></use>
                        </svg>
                                Status:

                                ${result.status}
                             </li>
                            <li>
                            <svg>
                            <use href="${icons}#earth-svgrepo-com"></use>
                        </svg>
                            Species: ${result.species}
                            </li>
                            <li>Type: ${result.type || `<span class='italic'>N/A</span>`}</li>
                            <li>Gender: ${result.gender}</li>
                            <li>
                             <svg>
                                    <use href="${icons}#calendar-svgrepo-com"></use>
                                </svg>
                                Created:
                             ${this._formatDate(new Date(result.created),this._locale)}
                             </li>
                        </ul>
                    </div>
                </div>
            `;
    }
    renderSpinner(){
        const markup = `
            <div class="spinner">
                <svg class="spinner--icon">
                    <use href="${icons}#spinner-svgrepo-com"></use>
                </svg>
            </div>
        `;
        this._rootElement.innerHTML = '';
        this._rootElement.insertAdjacentHTML('afterbegin',markup);
    }
    renderError(message = this._errorMessage){
        const markup = `
            <div class='error'>${message}</div>
        `;
        this._clear();
        this._rootElement.insertAdjacentHTML('afterbegin',markup);
    }
}

export default new TilesView('.container');