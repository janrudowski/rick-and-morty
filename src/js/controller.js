import * as model from "./model.js";
import tilesView from "./views/tilesView.js";
import paginationView from "./views/paginationView.js";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
const controlCharacterTiles = async function(){
    try{
        tilesView.renderSpinner();
        await model.getData(model.state.page);
        tilesView.render(model.state.results);
        paginationView.render(model.state);
    }catch(err){
        tilesView.renderError();
    }
}

const controlPagination = async function(page){
    try{
        tilesView.renderSpinner();
        await model.getData(model.getPage(page));
        paginationView.render(model.state);
        tilesView.render(model.state.results);
    }catch(err){
        tilesView.renderError();
    }
}


const init = function(){
    tilesView.addHandlerRender(controlCharacterTiles);
    paginationView.addHandlerClick(controlPagination);
};

init();


  