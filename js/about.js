/* =========================
   SIMPLE FADE IN
========================= */

const blocks = document.querySelectorAll(

'.info-block, .image-block'

);



window.addEventListener(

'scroll',

() => {

    blocks.forEach((block) => {

        const top =
        block.getBoundingClientRect().top;

        if(top < window.innerHeight - 100) {

            block.style.opacity = "1";

            block.style.transform =
            "translateY(0px)";
        }

    });

});



blocks.forEach((block) => {

    block.style.opacity = "0";

    block.style.transform =
    "translateY(40px)";

    block.style.transition =
    "1s";
});