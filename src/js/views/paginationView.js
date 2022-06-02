import { View } from "./view.js";
import icons from "../../img/icons.svg";
class PaginationView extends View{
    _generateMarkup(){
        const currentPage = this._data.page;
        const pageNumber = this._data.pageNumber;
        const prevBtn = `<button data-goto='${currentPage - 1}' class="pagination--btn">
        <svg>
            <use href="${icons}#left-arrow-svgrepo-com"></use>
        </svg>
        </button>`;
        const nextBtn = `<button data-goto='${currentPage + 1}' class="pagination--btn">
        <svg>
        <use href="${icons}#right-arrow-svgrepo-com"></use>
        </svg>
        </button>`;
        const text = `<div class="page-number">${currentPage}/${pageNumber}</div>`;
        if(currentPage === 1){
            return text+nextBtn;
        }
        if(currentPage == pageNumber){
            return prevBtn+text;
        }
        if(currentPage < pageNumber){
            return prevBtn+text+nextBtn;
        }
    }
    addHandlerClick(handler){
        this._rootElement.addEventListener('click',function(e){
            const btn = e.target.closest('.pagination--btn');
            if(!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

}

export default new PaginationView('.pagination--container');