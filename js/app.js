/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let nav;
let menu;
let pageSections;
let prevScrollpos = window.pageYOffset;
let scrolling = false;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
setInterval(() => {
    if (scrolling) {
        scrolling = false;
        showMenu();
    }
}, 2000);


/**
 * @description returns an array elements containing the page sections
 */
const getSections = () => {
    return [...document.querySelectorAll('[id^="section"]')];
}

/**
 * @description Adds event listeners to each nav item that scroll to the appropriate section on click
 * @param {Element} nav - navigation element on document
 */
const navListeners = (nav) => {
    [...nav.children].forEach((child) => {
        child.addEventListener('click', () => {
            scrollToElement(child.dataset.scroll);
        });
    });
}

/**
 * @description Checks to see if the a section is visible on the screen. If it is, it will be set to active.
 * @param {Object[]} elements - sections on the page to be included in navigation
 */
const watchSections = (elements) => {
    elements.forEach((element) => {
        if (
            element.getBoundingClientRect().top >= 0 &&
            element.getBoundingClientRect().bottom <= window.innerHeight
        ) {
            setActive(element.id, 'section--active');
            const navItem = document.querySelector(`#menu__link--${element.id}`);
            setActive(navItem.id, 'menu__link--active');
        }
    });
}

/**
 * @description Hides menu if page is not being scrolled
 * @param {Element} menu  - menu element to be hidden
 */
const showMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos || prevScrollpos > currentScrollPos) {
        menu.style.top = "0";
    } else {
        menu.style.top = "-52px";
    }
    prevScrollpos = currentScrollPos;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
 * @description adds nav element to page which contains links to sections on page
 * @param {Object[]} pageSections - sections on the page to be included in navigation
 */
const generateNav = (pageSections) => {
    pageSections.forEach(section => {
        nav.innerHTML += `<li class="nav__item" data-scroll="${section.id}"><a class="menu__link" id="menu__link--${section.id}" href="#section1-scroll">${section.dataset.nav}</a></li>`;
    });
}

// Add class 'active' to section when near top of viewport
/**
 * @description make toggle the active class for an element
 * @param {string} sectionId - id of the element to be made active
 * @param {string} className - name of "active" class, e.g. "menu__link--active"
 */
const setActive = (element, className) => {
    const activeElem = document.querySelectorAll(`.${className}`);
    if (activeElem) {
        activeElem.forEach((elem) => {
            elem.classList.remove(className);
        });
    }
    document.querySelector(`#${element}`).classList.toggle(className);
}



// Scroll to anchor ID using scrollTO event
/**
 * @description scroll to the window to the desired section
 * @param {string} sectionId - id of the element to scroll to
 */
const scrollToElement = (sectionId) => {
    let section = document.querySelector(`#${sectionId}`);
    window.scrollTo({
      behavior: 'smooth',
      top: window.scrollY + section.getBoundingClientRect().top,
      left: 0,
    });

    /*
     Personally I would prefer to use element.scrollIntoView for readability as seen below
    */

    // section.scrollIntoView({
    //     behavior: 'smooth'
    // });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener('DOMContentLoaded', () => {
    pageSections = getSections();
    nav = document.querySelector('#navbar__list');
    menu = document.querySelectorAll('.page__header')[0];
    // Build menu
    generateNav(pageSections);
    // Scroll to section on link click
    navListeners(nav);

    // Set scrolling events
    window.addEventListener('scroll', () => {
        // Set sections as active
        watchSections(pageSections);
        // Hide/show nav menu
        showMenu(menu)
        scrolling = true;
    });

});
