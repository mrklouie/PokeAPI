export { load } from "./load.js";
export { timeline }


const timeline = gsap.timeline();

timeline
.to("#pukeBall",{
    rotation: 360,
    repeat: -1,
    duration: 5,
    ease: "linear"
})











