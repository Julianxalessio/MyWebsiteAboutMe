async function getNavBar() {
    const response = await fetch("HTML/navbar.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector(".navBar").innerHTML = `
        ${data}
    `;
    markActiveLink();
}

async function getNavBar_IPAD() {
    const response = await fetch("HTML/navbar_ipad.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector(".navBar").innerHTML = `
        ${data}
    `;
    markActiveLink();
}

async function getHamburgerMenu() {
    const response = await fetch("HTML/hamburger.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector(".navBar").innerHTML = `
        ${data}
    `;
    markActiveLink();
}

function openChild() {
    document.querySelector(".dropdown-content").classList.toggle("hide");
};
let currentMode = null;

function getModeForWidthNavbar(w) {
    if (w >= 1001) return 'desktop';
    if (w >= 651) return 'ipad';
    return 'mobile';
}

async function loadAppropriateNav() {
    const w = window.innerWidth;
    const mode = getModeForWidthNavbar(w);
    if (mode === currentMode) return;
    currentMode = mode;
        console.debug('loadAppropriateNav called, window.innerWidth =', window.innerWidth);
    if (mode === 'desktop') {
        await getNavBar();
    } else if (mode === 'ipad') {
        await getNavBar_IPAD();
    } else {
        await getHamburgerMenu();
    }
}

window.addEventListener('load', () => {
    loadAppropriateNav();
});

window.addEventListener('resize', e => {
    loadAppropriateNav();
});

//Created with AI assistence
function markActiveLink() {
    document.querySelectorAll('.navBar a.active').forEach(a => a.classList.remove('active'));

    const file = location.pathname.split('/').pop() || 'index.html';
    const name = file.replace('.html', '') || 'index';

    const links = Array.from(document.querySelectorAll('.navBar a'));
    let matched = links.find(a => {
        const href = a.getAttribute('href') || '';
        const hrefFile = href.split('/').pop();
        if (!hrefFile) return false;
        return hrefFile === file || hrefFile === (name + '.html') || href.includes(name);
    });

    if (matched) {
        matched.classList.add('active');
    }

    document.body.classList.remove(...Array.from(document.body.classList).filter(c => c.startsWith('page-')));
    document.body.classList.add('page-' + name);
}

function toggleMenu() {
    document.querySelector(".buttons").classList.toggle("hide");
}