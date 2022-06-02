import { API_URL } from "./config.js";
import { TIMEOUT_SEC } from "./config.js";
export const state = {
    results: [],
    page: 1,
    pageNumber: 0,
}
const timeout = function(seconds){
    return new Promise((_,reject) =>{
        setTimeout(() => reject(new Error(`Request took too long!`)),seconds*1000);
    });
}

export const getData = async function(page){
    try{
        const request = fetch(`${API_URL}?page=${page}`);
        const result = await Promise.race([request,timeout(TIMEOUT_SEC)]);
        const data = await result.json();
        if(result.error) throw new Error(`Something went wrong. ${result.error}`);
        state.results = data;
        state.pageNumber = data.info.pages;
    }catch(err){
        throw err;
    }
}

export const getPage = function(page = state.page){
    state.page = page;
    return page;
}

