import '../styles/index.sass';

document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.querySelector(".scroll-to-see");
    if(scroller !== null) {
        scroller.addEventListener('click', () => {
            const weOffer = document.querySelector(".we-offer");
            if(weOffer !== null) {
                weOffer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            }
        });
    }

    const languageSelect = document.querySelector(".language-select");
    if (languageSelect !== null) {
        languageSelect.addEventListener('click', () => {
            const dropdown = document.querySelector(".select-lang-list");
            if(dropdown !== null) {
                dropdown.classList.toggle('visible')
            }
        })
    }

    const burgerMenu = document.querySelector(".burger-menu");
    if (burgerMenu !== null) {
        burgerMenu.addEventListener('click', () => {
            const menu = document.querySelector(".nav-bar");
            if(menu !== null) {
                menu.classList.toggle('visible')
            }
        })
    }
});