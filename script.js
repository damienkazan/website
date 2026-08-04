// DK Portfolio

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar.style.background = "rgba(5,5,5,.85)";
        navbar.style.backdropFilter = "blur(20px)";

    }else{

        navbar.style.background = "rgba(5,5,5,.18)";
        navbar.style.backdropFilter = "blur(18px)";

    }

});



const projects = document.querySelectorAll(".project");

projects.forEach(project=>{

    project.addEventListener("mouseenter",()=>{

        project.style.transform="translateY(-8px)";
        project.style.transition=".35s";

    });

    project.addEventListener("mouseleave",()=>{

        project.style.transform="translateY(0px)";

    });

});
