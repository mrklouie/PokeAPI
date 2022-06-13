import * as module from "./gsap.js";

const url = "https://pokeapi.co/api/v2/pokemon?offset=0&Limit=20";
const promises = [];
const pokeId = []


const fetchPokemon = async()=>{
    const res = await fetch(url);
    const data = await res.json();
    const { results, next, previous } = data;
    console.log(next)
    //Iterate to get the URL for them ID's
    // console.log(results);
    for(let i = 0; i < 20; i++){
        if(results){
            const {url} = results[i];
            const urlArray = url.split("/");
            const tmpId = urlArray[urlArray.length -2];
            pokeId.push(tmpId);
         
        }
    }
    console.log(pokeId); 

    //Uncomment this to call the function
    // getPokemon();
}

const getPokemon =async()=>{
    try{
        for(let i = 0; i < pokeId.length; i++){
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId[i]}`);
            const data = await res.json();
            promises.push(data);
        }
    
        const resultData = await Promise.all(promises.map(data=>({
            name: data.name,
            types: data.types,
            image: data.sprites.other.dream_world.front_default
        })));

        console.log(resultData);
        pokeId.splice(0, pokeId.length);
        promises.splice(0, promises.length);
    }catch(err){
        console.error(err.messsage);
    }
}


//Creattion of Pokemon Cards
//Use Template Strings
//Modify mo naden dito yung mga background color per Type ng pukemon
const createPokemon=async()=>{

}




//CALLING THE MAIN FUNCTION
fetchPokemon();





