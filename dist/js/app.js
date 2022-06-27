import * as module from "./gsap.js";




module.fetchAllPokemon();

//=========ALL VARIABLES HERE=========//
const baseStatsEl = document.getElementById("base-stats");
let pokemons;
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
        const element = e.target;
        module.search.value = ""
        ewan(element)
    
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
        card.addEventListener("click", ()=>{
            ewan(card)
        })
    })

}


async function ewan(card){
    const id = card.querySelector("[data-target-id]").dataset.targetId;
    console.log(`Pokemon ID: ${id}`);   
    loadScreen.show();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json();  
    //Properties na ipapasa ko
    const stats = data.stats.map(stat=>({
        statName: stat.stat.name,
        statValue: stat.base_stat
    }))
    const hp = stats[0];
    const attack = stats[1];
    const defense = stats[2];
    const specialAttack = stats[3];
    const specialDefense = stats[4];
    const speed = stats[5];
   
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
    document.querySelector(".results-wrapper").style.display = "none";
    let habitat = "Not available";
    if(data2.habitat){
        habitat = data2.habitat.name
    }
    // const habitat = data2.habitat.name
    const eggGroup = data2.egg_groups.map(egg=>egg.name)
    const eggGroup1 = eggGroup[0]
    let eggGroup2 = ""
    if(eggGroup[1]){
        eggGroup2 = eggGroup[1]
    }
    timeline.play()
    document.querySelector("html").style.overflow = "hidden"
    pokemons = 
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
        eggGroup2: eggGroup2,
        hp: hp,
        attack: attack,
        specialAttack: specialAttack,
        specialDefense: specialDefense,
        speed: speed
    }
   
    about(pokemons);
}

    

    back.addEventListener("click",()=>{
        timeline.reverse(0.6)
        document.querySelector("html").style.overflow = "unset"
    })


//Trigger this after clicking
//After fetching ibalik mo naman sa 'Load more'
loadMore.addEventListener("click", ()=>{
    fetchPokemon(nextUrl)
  
})


//CALLING THE MAIN FUNCTION
fetchPokemon("https://pokeapi.co/api/v2/pokemon?offset=0&Limit=20");



const about = (pokemon)=>{
  
    const overlayBackground = document.querySelector(".overlay2");
    const pokemonTypes = document.querySelector(".left");
    const pokemonImage = document.querySelector(".pokemon-img");
    const pokemonName = document.querySelector(".pokemon-name");
    const pokemonType1 = document.querySelector(".type1");
    const pokemonType2 = document.querySelector(".type2");
    const id = document.querySelector(".id");
    const contentsWrapper = document.querySelector(".contents-wrapper");

    contentsWrapper.innerHTML = `
        <div class="about-container__mid">
            <div class="contents__row-1-col-1 col-1">Habitat</div>
            <div class="about-container__row-1-col-2">${pokemon.habitat}</div>
            <div class="about-container__row-2-col-1 col-1">Height</div>
            <div class="about-container__row-2-col-2">${pokemon.height}"</div>
            <div class="about-container__row-3-col-1 col-1">Weight</div>
            <div class="about-container__row-3-col-2">${pokemon.weight} lbs</div>
            <div class="about-container__row-4-col-1 col-1">Abilities</div>
            <div class="about-container__row-4-col-2">${pokemon.abilities}</div>
            </div>
            <h3 class="about-container__breeding">Breeding</h3>
            <div class="about-container__bottom">
            <div class="about-container__row-2-col-1 col-1 gender">Egg Groups</div>
            <div class="about-container__row-2-col-2 gender">${pokemon.eggGroup1}</div>
            <div class="about-container__row-2-col-2 gender">${pokemon.eggGroup2}</div>
            <div class="about-container__row-3-col-1 col-1 egg-cycle">Egg Cycle</div>
            <div class="about-container__row-3-col-2 egg-grass">${pokemon.habitat}</div>
        </div>
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
    // baseStats(pokemon); 
    console.log(pokemons)
}


//Create a funciton para mag c-create ng element para sa Base Stats and yung tatanggap sya ng parameter galing kay function ewan
const baseStats=(pokemon)=>{
    console.log(pokemon)
    const contentsWrapper = document.querySelector(".contents-wrapper");
    const statsTemplate = document.getElementById("template-base-stats").content.children[0].cloneNode(true)
    statsTemplate.querySelector(".contents__hp-string").textContent = pokemon.hp.statName.toUpperCase();
    statsTemplate.querySelector(".contents__hp-number").textContent = pokemon.hp.statValue
    statsTemplate.querySelector(".progress-bar-hp").style.width = `${pokemon.hp.statValue}%`
    
    statsTemplate.querySelector(".contents__attack-string").textContent = capitalize(pokemon.attack.statName) 
    statsTemplate.querySelector(".contents__attack-number").textContent = pokemon.attack.statValue
    statsTemplate.querySelector(".progress-bar-attack").style.width = `${pokemon.attack.statValue}%`

    statsTemplate.querySelector(".contents__sp-attack-string").textContent = `Sp. Atk`
    statsTemplate.querySelector(".contents__sp-attack-number").textContent = pokemon.specialAttack.statValue
    statsTemplate.querySelector(".progress-bar-sp-attack").style.width = `${pokemon.specialAttack.statValue}%`
    
    statsTemplate.querySelector(".contents__sp-def-string").textContent = `Sp. Def`
    statsTemplate.querySelector(".contents__sp-def-number").textContent = pokemon.specialDefense.statValue
    statsTemplate.querySelector(".progress-bar-sp-def").style.width = `${pokemon.specialDefense.statValue}%`
    
    statsTemplate.querySelector(".contents__speed-string").textContent =capitalize(pokemon.speed.statName) 
    statsTemplate.querySelector(".contents__speed-number").textContent = pokemon.speed.statValue
    statsTemplate.querySelector(".progress-bar-speed").style.width = `${pokemon.speed.statValue}%`
    contentsWrapper.innerHTML = "";
    contentsWrapper.append(statsTemplate);
}


baseStatsEl.addEventListener("click", ()=>{
    baseStats(pokemons)
})




aboutEl.addEventListener("click", ()=>{
    // // gsap.fromTo(".contents",{
    // //     x: -150,
    // //     opacity: 0
    // // },
    // // {
    // //     x: 0,
    // //     opacity: 1
    // // })
    console.log("Clicked")
    
    document.querySelector(".contents-wrapper").innerHTML = `
        <div class="about-container">
          <div class="about-container__mid">
          </div>
          <div class="about-container__bottom">
          </div>
        </div>
    `
    about(pokemons)
})





