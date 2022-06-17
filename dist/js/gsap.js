export { load } from "./load.js";
export { timeline }


const timeline = gsap.timeline();
const timeline2 = gsap.timeline({
    paused: true
});

timeline
.to("#pukeBall",{
    rotation: 360,
    repeat: -1,
    duration: 5,
    ease: "linear"
})

timeline2.to(".overlay2",{
    yPercent: -100,
    duration: 0.9,
    ease: Back.easeOut.config(0.2)
})











