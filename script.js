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

// ---- VIDEO MODAL (Vimeo) ----
const videoModal = document.getElementById("videoModal");
const modalVideoEmbed = document.getElementById("modalVideoEmbed");
const videoModalClose = document.getElementById("videoModalClose");

let currentRatio = 56.25;

function sizeVideoEmbed(ratio){
    const maxWidth = Math.min(window.innerWidth * 0.84, 1100);
    const maxHeight = window.innerHeight * 0.8;

    let width = maxWidth;
    let height = width * (ratio / 100);

    if(height > maxHeight){
        height = maxHeight;
        width = height / (ratio / 100);
    }

    modalVideoEmbed.style.width = width + "px";
    modalVideoEmbed.style.height = height + "px";
}

function openVideoModal(vimeoId, ratio){
    if(!vimeoId) return;

    currentRatio = parseFloat(ratio) || 56.25;

    modalVideoEmbed.innerHTML =
        '<iframe src="https://player.vimeo.com/video/' + vimeoId +
        '?title=0&byline=0&portrait=0&autoplay=1" frameborder="0" ' +
        'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';

    sizeVideoEmbed(currentRatio);

    videoModal.classList.add("active");
    document.body.classList.add("modal-open");
}

function closeVideoModal(){
    modalVideoEmbed.innerHTML = "";
    videoModal.classList.remove("active");
    document.body.classList.remove("modal-open");
}

window.addEventListener("resize", ()=>{
    if(videoModal.classList.contains("active")){
        sizeVideoEmbed(currentRatio);
    }
});

projects.forEach(project=>{
    project.addEventListener("click", ()=>{
        openVideoModal(project.getAttribute("data-video"), project.getAttribute("data-ratio"));
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

// ---- CONTACT FORM ----
const contactForm = document.querySelector(".contact-form");
if(contactForm){
    const successMsg = contactForm.querySelector(".form-success");
    const errorMsg = contactForm.querySelector(".form-error");
    const submitBtn = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        successMsg.classList.remove("show");
        errorMsg.classList.remove("show");
        if(submitBtn){
            submitBtn.disabled = true;
        }

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if(response.ok){
                successMsg.classList.add("show");
                contactForm.reset();
            } else {
                errorMsg.classList.add("show");
            }
        })
        .catch(() => {
            errorMsg.classList.add("show");
        })
        .finally(() => {
            if(submitBtn){
                submitBtn.disabled = false;
            }
        });
    });
}
