//========ALL CLASSES HERE============//
export { load }
class load{
    constructor(el) {
        this.el = el;
    }

    show(){
        this.el.classList.add("active");
        document.body.style.overflow = "hidden"
    }


    hide(){
        this.el.classList.remove("active");
        document.body.style.overflowX = "hidden"
        document.body.style.overflowY = "auto"
    }
}

