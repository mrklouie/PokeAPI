import * as module from "./gsap.js";




module.fetchAllPokemon();

//=========ALL VARIABLES HERE=========//

const back = document.querySelector(".back");
let nextUrl
let prevUrl
const loadMore = document.querySelector(".load-more");
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const promises = [];
const pokeId = []
const loadScreen = new module.load(overlay);
const aboutEl = document.getElementById("about");
const timeline = gsap.timeline({paused: true});
timeline.to(".overlay2",{
    xPercent: -100,
    duration: 0.9,
    ease: Back.easeOut.config(0.2)
})





//=========ALL FUNCTIONS HERE=========//
function capitalize(el){
    return el.charAt(0).toUpperCase() + el.substring(1);
}


window.addEventListener("click", e=>{
    if(!e.target.closest("#search") && !e.target.closest(".card-container")){
        document.querySelector(".results-wrapper").style.display = "none"
    }else if(e.target.closest(".card-container")){
       const id = e.target.dataset.targetId;
       
    }
})


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
            image: data.sprites.other.dream_world.front_default,
            id: data.id
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
        const id = pokemon.id;
        if(types[1]){
            secondType = types[1].type.name
        }
        gridContainer.innerHTML += 
        `
        <div class="grid-container__card ${firstType}">
          <div class="grid-container__left" data-target-id="${id}">
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
    loadScreen.hide();
        const cards = document.querySelectorAll(".grid-container__card");
        cards.forEach(card=>{ 
            card.addEventListener("click",async()=>{
                const id = card.querySelector("[data-target-id]").dataset.targetId;
                console.log(`Pokemon ID: ${id}`);   
                loadScreen.show();
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const data = await res.json();  
    
                //Properties na ipapasa ko
                const image = data.sprites.other.dream_world.front_default;
                const name = data.name;
                const weight = data.weight;
                const height = data.height;
                const types = data.types;
                const firstType = types[0].type.name;
                let secondType = "";
                if(types[1]){
                    secondType = types[1].type.name
                }
                let abilities = data.abilities.map(ability=>ability.ability.name)
                abilities = abilities.join(", ")
                const res2 = await fetch(`${data.species.url}`)
                const data2 = await res2.json();
                loadScreen.hide();
                const habitat = data2.habitat.name
                const eggGroup = data2.egg_groups.map(egg=>egg.name)
                const eggGroup1 = eggGroup[0]
                let eggGroup2 = ""
                if(eggGroup[1]){
                    eggGroup2 = eggGroup[1]
                }
                timeline.play()
                document.querySelector("html").style.overflow = "hidden"
                const pokemons = 
                {
                    abilities: abilities,
                    image: image,
                    name: name,
                    height: height,
                    weight: weight,
                    id: id,
                    type1: firstType,
                    type2: secondType,
                    habitat: habitat,
                    eggGroup1: eggGroup1,
                    eggGroup2: eggGroup2
                }
                console.log(pokemons)
                generateElement(pokemons);
            })
        })
   

    back.addEventListener("click",()=>{
        timeline.reverse(0.6)
        document.querySelector("html").style.overflow = "unset"
    })

}

//Trigger this after clicking
//After fetching ibalik mo naman sa 'Load more'
loadMore.addEventListener("click", ()=>{
    fetchPokemon(nextUrl)
  
})


//CALLING THE MAIN FUNCTION
fetchPokemon("https://pokeapi.co/api/v2/pokemon?offset=0&Limit=20");




const generateElement = (pokemon)=>{
    return new Promise((resolve,reject)=>{
        try{
            const overlayBackground = document.querySelector(".overlay2");
            const pokemonTypes = document.querySelector(".left");
            const pokemonImage = document.querySelector(".pokemon-img");
            const pokemonName = document.querySelector(".pokemon-name");
            const pokemonType1 = document.querySelector(".type1");
            const pokemonType2 = document.querySelector(".type2");
            const id = document.querySelector(".id");
            document.querySelector(".contents__mid").innerHTML = 
            `
            <div class="contents__row-1-col-1 col-1">Habitat</div>
                    <div class="contents__row-1-col-2">${pokemon.habitat}</div>
                    <div class="contents__row-2-col-1 col-1">Height</div>
                    <div class="contents__row-2-col-2">${pokemon.height}"</div>
                    <div class="contents__row-3-col-1 col-1">Weight</div>
                    <div class="contents__row-3-col-2">${pokemon.weight} lbs</div>
                    <div class="contents__row-4-col-1 col-1">Abilities</div>
                    <div class="contents__row-4-col-2">${pokemon.abilities}</div>
                    `
            
            document.querySelector(".contents__bottom").innerHTML = 
            `
            <div class="contents__breeding">Breeding</div>
                    <div class="contents__row-2-col-1 col-1 gender">Egg Groups</div>
                    <div class="contents__row-2-col-2 gender">${pokemon.eggGroup1}</div>
                    <div class="contents__row-2-col-2 gender">${pokemon.eggGroup2}</div>
                    <div class="contents__row-3-col-1 col-1 egg-cycle">Egg Cycle</div>
                    <div class="contents__row-3-col-2 egg-grass">${pokemon.habitat}</div>
            `
            //Setting the background
            overlayBackground.setAttribute("id", `bg__${pokemon.type1}`);
            pokemonImage.setAttribute("src", `${pokemon.image}`)
            pokemonName.textContent = `${capitalize(pokemon.name)}`
            pokemonType1.textContent = `${pokemon.type1}`
            if(pokemon.type2){
                pokemonType2.classList.toggle("hide", !pokemon.type2);
                pokemonType2.innerHTML = `${pokemon.type2}`
            }else{
                pokemonType2.style.display = "none"
            }
            id.textContent = `#${pokemon.id.padStart("4", "0")}`
            
            resolve("Resolved!")
        }catch(err){
            reject(new Error("Something went wrong", err))
        }
    })
}


aboutEl.addEventListener("click", async()=>{
    gsap.fromTo(".contents",{
        x: -150,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1
    })
})




