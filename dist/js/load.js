//========ALL CLASSES HERE============//
export { load }
const loadMore = document.querySelector(".load-more");

class load{
    constructor(el) {
        this.el = el;
    }

    show(){
        this.el.classList.add("active");
        document.body.style.overflow = "hidden"
        loadMore.innerHTML = `<img src="/dist/assets/Loading-bottom.svg"/>`

    }


    hide(){
        this.el.classList.remove("active");
        document.body.style.overflowX = "hidden"
        document.body.style.overflowY = "auto"
        loadMore.innerHTML = `Load More`
    }
}

