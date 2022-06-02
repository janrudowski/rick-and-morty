export class View{

    _rootElement;
    _data;
    _locale = navigator.language;
    constructor(rootElement){
        this._rootElement = document.querySelector(rootElement);
    }

    _clear(){
        this._rootElement.innerHTML = '';
    }

    render(data){
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._rootElement.insertAdjacentHTML('afterbegin',markup);
    }
}