import * as module from "./gsap.js";



//=========ALL VARIABLES HERE=========//
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const url = "https://pokeapi.co/api/v2/pokemon?offset=0&Limit=20";
const promises = [];
const pokeId = []



const loadScreen = new module.load(overlay);



//=========ALL FUNCTIONS HERE=========//
const fetchPokemon = async()=>{
    loadScreen.show()
    const res = await fetch(url);
    const data = await res.json();
    const { results, next, previous } = data;
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
    //Uncomment this to call the function
    
    getPokemon();
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
    
        createPokemon(resultData)
        pokeId.splice(0, pokeId.length);
        promises.splice(0, promises.length);
    }catch(err){
        console.error(err.messsage);
    }
}




//Creattion of Pokemon Cards
//Use Template Literals
//Modify mo naden dito yung mga background color per Type ng pukemon
const createPokemon=(data)=>{
       data.forEach(pokemon=>{
        let secondType = "";
        const name = pokemon.name;
        const types = pokemon.types;
        const firstType = types[0].type.name;
        const image = pokemon.image;

        if(types[1]){
            secondType = types[1].type.name
        }

        gridContainer.innerHTML += 
        `
        <div class="grid-container__card ${firstType}">
          <div class="grid-container__left">
            <div class="grid-container__texts">
              <h2>${name}</h2>
              <small>${firstType}</small>
              <small>${secondType}</small>
            </div>
          </div>
          <div class="grid-container__right">
            <img src="${image}" alt="" />
          </div>
        </div>
        `
    })    
    loadScreen.hide();
}







//CALLING THE MAIN FUNCTION
fetchPokemon();





