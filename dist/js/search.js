export { container, search, fetchAllPokemon, resultWrapper, id, promises, pokemons }
const container = document.querySelector(".grid-container");
const search = document.getElementById("search");
const resultWrapper = document.querySelector(".results-wrapper");

let id = [];
let promises = [];
let pokemons = [];



search.addEventListener("input",e=>{
    pokemons.forEach(data=>{
        document.querySelector(".results-wrapper").style.display = "block"
        const value = e.target.value.toLowerCase().trim();
        const isMatched = data.name.toLowerCase().includes(value) || data.id.toLowerCase().includes(value)
        data.result.classList.toggle("show", isMatched)
    })
})





function fetchAllPokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
        .then(res=>res.json())
        .then(data=>{
            data.results.map(pokemon=>{
                const urlArray = pokemon.url.split("/");
                const pokeId = urlArray[urlArray.length -2];
                id.push(pokeId);
            })
            id.forEach(id=>{
                promises.push(fetch(` https://pokeapi.co/api/v2/pokemon/${id}`).then(res=>res.json()))
            })
        })
        .then(()=>{
            Promise.all(promises).then(data=>{
                pokemons = data.map(pokemon=>{
                    const id = pokemon.id.toString();
                    const cardTemplate = document.getElementById("cardTemplate").content.children[0].cloneNode(true);
                    const pokeName = cardTemplate.querySelector(".poke-name");
                    const pokeId = cardTemplate.querySelector(".poke-id");
                    pokeId.setAttribute("data-target-id", `${id}`);
                    pokeName.innerHTML = `<p>${pokemon.name}</p>`
                    pokeId.innerHTML = `<p>#${id.padStart("4", "0")}</p>`;
                    const name = pokemon.name;
                    const type1 = pokemon.types[0].type.name
                    let type2  = "";
                    if(pokemon.types[1]){
                        type2 = pokemon.types[1].type.name;
                    }
                    resultWrapper.append(cardTemplate)
                    return {
                        id: id,
                        name: name,
                        type1: type1,
                        type2: type2,
                        result: cardTemplate
                    }
                })  
            })
            const card = document.querySelector(".card-container");
        })
        
}
