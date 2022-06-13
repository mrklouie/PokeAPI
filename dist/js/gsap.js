export { timeline }


const timeline = gsap.timeline();
timeline.to("#pukeBall",{
    rotation: 360,
    repeat: -1,
    duration: 4,
    ease: "linear"
})