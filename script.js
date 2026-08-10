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

// ---- VIDEO MODAL ----
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoModalClose = document.getElementById("videoModalClose");

function openVideoModal(src){
    if(!src) return;
    modalVideo.setAttribute("src", src);
    videoModal.classList.add("active");
    document.body.classList.add("modal-open");
    modalVideo.play();
}

function closeVideoModal(){
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    videoModal.classList.remove("active");
    document.body.classList.remove("modal-open");
}

projects.forEach(project=>{
    project.addEventListener("click", ()=>{
        openVideoModal(project.getAttribute("data-video"));
    });
});

videoModalClose.addEventListener("click", closeVideoModal);

videoModal.addEventListener("click", (e)=>{
    if(e.target === videoModal){
        closeVideoModal();
    }
});

document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && videoModal.classList.contains("active")){
        closeVideoModal();
    }
});
