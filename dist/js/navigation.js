const navigations = document.querySelectorAll(".navigations");
const backNavigation = document.querySelector(".back");
navigations[0].classList.add("active")



document.addEventListener("click", e =>{
    let current;
    const isClicked = e.target.matches(".navigations");
    if(isClicked){
        current = e.target.closest(".navigations")
        current.classList.add("active")
  


    document.querySelectorAll(".navigations.active").forEach(nav=>{
        if(current === nav) return
        nav.classList.remove("active")
    })

    
}
})

backNavigation.addEventListener("click",()=>{
    setTimeout(()=>{
        document.querySelectorAll(".navigations.active").forEach(nav=>{
            nav.classList.remove("active")
        })
        navigations[0].classList.add("active")
    }, 900)
})




