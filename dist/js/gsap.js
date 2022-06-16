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



// gsap.from(".overlay2",{
//     yPercent: 100,
//     duration: 0.9,
//     ease: Back.easeOut.config(0.1)
// })










