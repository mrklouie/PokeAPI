import * as module from "./gsap.js";



//=========ALL VARIABLES HERE=========//
let nextUrl
let prevUrl
const loadMore = document.querySelector(".load-more");
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const promises = [];
const pokeId = []
const loadScreen = new module.load(overlay);





//=========ALL FUNCTIONS HERE=========//
function capitalize(el){
    return el.charAt(0).toUpperCase() + el.substring(1);
}


const fetchPokemon = async(url)=>{
    try{
        loadScreen.show()
        const res = await fetch(url);
        const data = await res.json();
        const { results, next, previous} = data;
        nextUrl = next;
        prevUrl = prevUrl;
        for(let i = 0; i < 20; i++){
        if(results){
            const {url} = results[i];
            const urlArray = url.split("/");
            const tmpId = urlArray[urlArray.length -2];
            pokeId.push(tmpId);
         
        }
    }
    getPokemon();
    }catch(err){
        console.log(err.message)
    }
           
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
              <h2>${capitalize(name)}</h2>
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
    const cards = document.querySelectorAll(".grid-container__card").length;
    console.log(`Number of Cards: ${cards}`);
    loadScreen.hide();
}

//Trigger this after clicking
//After fetching ibalik mo naman sa 'Load more'
loadMore.addEventListener("click", ()=>{
    fetchPokemon(nextUrl)
  
})


//CALLING THE MAIN FUNCTION
fetchPokemon("https://pokeapi.co/api/v2/pokemon?offset=0&Limit=20");



const aboutEl = document.getElementById("about");





const generateElement = ()=>{
    return new Promise((resolve,reject)=>{
        try{
            document.querySelector(".contents__mid").innerHTML = 
            `
            <div class="contents__row-1-col-1 col-1">Species</div>
                    <div class="contents__row-1-col-2">Seed</div>
                    <div class="contents__row-2-col-1 col-1">Height</div>
                    <div class="contents__row-2-col-2">2'36"(10.70cm)</div>
                    <div class="contents__row-3-col-1 col-1">Weight</div>
                    <div class="contents__row-3-col-2">15.2 lbs</div>
                    <div class="contents__row-4-col-1 col-1">Abilities</div>
                    <div class="contents__row-4-col-2">Lorem, ipsum.</div>
                    `
            
            document.querySelector(".contents__bottom").innerHTML = 
            `
            <div class="contents__breeding">Breeding</div>
                    <div class="contents__row-1-col-1 col-1 gender">Gender</div>
                    <div class="contents__row-1-col-2 gender">Male</div>
                    <div class="contents__row-1-col-3 gender">Female</div>
                    <div class="contents__row-2-col-1 col-1 gender">Egg Groups</div>
                    <div class="contents__row-2-col-2 gender">Monster</div>
                    <div class="contents__row-3-col-1 col-1 egg-cycle">Egg Cycle</div>
                    <div class="contents__row-3-col-2 egg-grass">Grass</div>
            `
            resolve("Resolved!")
        }catch(err){
            reject(new Error("Something went wrong", err))
        }
    })
}


aboutEl.addEventListener("click", async()=>{
    await generateElement();
    gsap.fromTo(".contents",{
        x: -150,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1
    })
})


